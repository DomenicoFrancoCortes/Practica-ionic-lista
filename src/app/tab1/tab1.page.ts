import { Component } from '@angular/core';
import { AlertController, ToastController } from '@ionic/angular';
import { Lista } from '../models/lista.model';
import { ListaService } from '../Servicios/lista.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  constructor(public alertController: AlertController,
    public toastController: ToastController,
    public listaService: ListaService) { }

  /**
* @function AgregarLista
* @description La función será ejecutada cuando el usuario haga click en el botón Agregar
* Muestra una alerta donde solicita el nombre de la lista
* @param {any}
* @return {boolean}
*/

  async AgregarLista() {
    let alerta = await this.alertController.create({
      header: "Agregar lista",
      inputs: [
        {
          type: "text",
          name: "titulo",
          placeholder: "Ingresar nombre de la lista"
        }
      ],
      buttons: [
        {
          text: "Cancelar",
          role: "cancel"
        },
        {
          text: "Crear",
          handler: (data: any) => {
            let esValido: boolean = this.validarInput(data);
            if (esValido) {
              let creadaOk = this.listaService.crearLista(data.titulo);
              if (creadaOk) { //Se verifica si la variable tiene un valor, es decir, que fue creada
                this.presentToast('Lista creada correctamente!');
              }
            }
          }
        }
      ]
    })
    await alerta.present();
    console.log('Click en el boton!');
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



}
