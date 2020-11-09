import { Component, OnInit } from '@angular/core';
import { Cliente } from '../../models/cliente';

@Component({
  selector: 'app-search-cliente',
  templateUrl: './search-cliente.component.html',
  styleUrls: ['./search-cliente.component.css']
})
export class SearchClienteComponent implements OnInit {

  public clientes: Cliente[];

  constructor() { }

  ngOnInit() {
    if(sessionStorage.getItem('busqueda') != 'undefined'){
      this.clientes = JSON.parse(sessionStorage.getItem('busqueda'));
    }
  }

}
