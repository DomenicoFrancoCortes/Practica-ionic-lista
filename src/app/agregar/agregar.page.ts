import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AlertController, ToastController } from '@ionic/angular';
import { Actividad } from '../models/actividades.model';
import { Lista } from '../models/lista.model';
import { ListaService } from '../Servicios/lista.service';

@Component({
  selector: 'app-agregar',
  templateUrl: './agregar.page.html',
  styleUrls: ['./agregar.page.scss'],
})
export class AgregarPage implements OnInit {

  lista: Lista
  nombreItem: string

  constructor(private router: ActivatedRoute,
    public listaService: ListaService,
    private alertController: AlertController,
    private toastController: ToastController) {
    let idLista = this.router.snapshot.paramMap.get('idLista');
    this.lista = this.listaService.obtenerLista(idLista);


  }

  ngOnInit() {
  }

  agregar() {


    if (this.nombreItem.length === 0) {
      return
    }
    const actividad = new Actividad(this.nombreItem);
    this.lista.item.push(actividad);
    this.listaService.guardarStorage();
    this.nombreItem = '';

  }

  editar(actividad: Actividad) {
    this.EditarActividad(actividad);
  }
  
  eliminar(actividad: Actividad) {
    this.lista.item = this.lista.item.filter((item) => item !== actividad);
    this.listaService.guardarStorage();

  }

  cambioCkeck() {
    const pendientes = this.lista.item.filter((item) => item.completado == false).length;
    if (pendientes == 0) {
      this.lista.completada = true;
      this.lista.terminadaEn = new Date();
    } else {
      this.lista.completada = false;
      this.lista.terminadaEn = null;
    }
    this.listaService.guardarStorage();
  }
  async EditarActividad(actividad: Actividad) {
    let alerta = await this.alertController.create({
      header: "Editar Actividad",
      inputs: [
        {
          type: "text",
          name: "titulo",
          placeholder: "¡Ingresar nuevo nombre de la Actividad",
          value: actividad.descripcion
        }
      ],
      buttons: [
        {
          text: "Cancelar",
          role: "cancel"
        },
        {

          text: "Editar",
          handler: (data: any) => {
            let esValido: boolean = this.validarInput(data);
            if (esValido) {
              actividad.descripcion = data.titulo,
                this.listaService.guardarStorage()
              this.presentToast('¡Lista editada correctamente!');
            }
          }
        }
      ]
    })
    await alerta.present();
  }
  validarInput(input: any): boolean {
    if (input && input.titulo) {
      return true;
    }
    this.presentToast('Debe ingresar un valor');
    return false;
  }

  async presentToast(mensage: string) {
    let toast = await this.toastController.create({
      message: mensage,
      duration: 3000
    });
    toast.present();
  }


}
