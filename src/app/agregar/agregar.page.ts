import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Lista } from '../models/lista.model';
import { ListaService } from '../Servicios/lista.service';

@Component({
  selector: 'app-agregar',
  templateUrl: './agregar.page.html',
  styleUrls: ['./agregar.page.scss'],
})
export class AgregarPage implements OnInit {

  lista: Lista

  constructor(private router: ActivatedRoute,
              public listaService: ListaService) { 
    let idLista = this.router.snapshot.paramMap.get('idLista');
    this.lista = this.listaService.obtenerLista(idLista);


  }

  ngOnInit() {
  }

}
