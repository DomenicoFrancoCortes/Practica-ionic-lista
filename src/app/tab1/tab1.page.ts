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

  

 


}
