import { Component, Input, OnInit } from '@angular/core';
import { AlertController, ToastController } from '@ionic/angular';
import { ListaService } from 'src/app/Servicios/lista.service';
import { Lista } from 'src/app/models/lista.model';
import { Router } from '@angular/router';



@Component({
  selector: 'app-listas',
  templateUrl: './listas.component.html',
  styleUrls: ['./listas.component.scss'],
})
export class ListasComponent implements OnInit {
  @Input() tipo: string;

  constructor(public alertController: AlertController,
    public toastController: ToastController,
    public listaService: ListaService,
    private roter: Router) { }

  ngOnInit() { }



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
      duration: 2000
    });
    toast.present();
  }


  async EditarLista(lista: Lista) {
    let alerta = await this.alertController.create({
      header: "¿Seguro que quieres editar la lista?",
      inputs: [
        {
          type: "text",
          name: "titulo",
          placeholder: "¡Ingresar nuevo nombre de la lista",
          value: lista.titulo
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
              lista.titulo = data.titulo,
                this.listaService.editarLista(lista);
              this.presentToast('¡Lista editada correctamente!');
            }
          }
        }
      ]
    })
    await alerta.present();
  }



  editarLista(listaItem: Lista) {
    this.EditarLista(listaItem);

  }

  eliminarLista(listaItem: Lista) {
    this.EliminarLista(listaItem);

  }

  async EliminarLista(listaItem: Lista) {
    //this.firestoreService.deleteDoc(this.path, producto.id);

    const alert = await this.alertController.create({
      header: '¿Seguro quieres eliminar la Lista?',
      cssClass: 'subtitulo',
      buttons: [
        {
          text: 'Cancelar',
          cssClass: 'normal',
          role: 'cancel',
          handler: () => {
            let handlerMessage = 'Alert canceled';
          },
        },
        {
          text: 'Confirmar',
          cssClass: 'normal',
          role: 'confirm',
          handler: () => {
            this.listaService.eliminarLista(listaItem);
            this.presentToast('¡Lista elimidada con exito!');

          },
        },
      ],
    });

    await alert.present();
  }

  listaSeleccionada(listaItem: Lista) {
    const URL = '/agregar/' + listaItem.id
    this.roter.navigateByUrl(URL);
    this.presentToast('¡Lista Seleccionada¡');
  }



}
