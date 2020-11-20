import { Component, OnInit } from '@angular/core';
import { Cliente } from '../../models/cliente';
import { ActivatedRoute, Router } from '@angular/router';
import { ClienteService } from '../../services/cliente.service';

@Component({
  selector: 'app-search-cliente',
  templateUrl: './search-cliente.component.html',
  styleUrls: ['./search-cliente.component.css'],
  providers: [ClienteService]
})
export class SearchClienteComponent implements OnInit {

  public clientes: Cliente[];
  public nombre: string;
  advertencia: boolean = false;

  constructor(private _route: ActivatedRoute, private _router: Router, private _clienteservice: ClienteService) { 
    
  }

  ngOnInit() {
    this.nombre = sessionStorage.getItem('busqueda');
    this._clienteservice.buscarCliente(this.nombre).subscribe(data => {
      console.log(data.datos);
      if(data.datos != null){
        this.clientes = data.datos;
      }else{
        this.clientes = null;
        this.advertencia = true;
      }
    })
  }

  onCloseAlert() {
    this.advertencia = false;
  }

}
