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
 


}
