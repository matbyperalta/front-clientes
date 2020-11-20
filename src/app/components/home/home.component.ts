import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Clientes } from '../../models/clientes';
import { Cliente } from '../../models/cliente';
import { ControlContainer } from '@angular/forms';
import { ClienteService } from '../../services/cliente.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  providers: [ClienteService]
})
export class HomeComponent implements OnInit {

  public clientes: Cliente[];
  seleccionado:boolean = false;
  advertencia:boolean = false;
  procesando:boolean = false;
  error:boolean = false;

  constructor(
    private _router: Router,
    private _clienteservice : ClienteService
  ) {     
    
  }

  ngOnInit() {
    this.procesando = true;
    this._clienteservice.getClientes().subscribe(data => {
      if(data.codigo == 'OK'){
        this.clientes = data.datos;
        if(this.clientes == null || this.clientes.length == 0){
          this.advertencia = true;
        }
      }else if(data.codigo == 'ERROR'){
        this.error = true;
      }
      this.procesando = false;
    })

  }

  irModificar() {
    //this._router.navigate(['modificar']);
    this.seleccionado = true;
  }

  onCloseAlert(){
    this.advertencia = false;
    this.error = false;
  }

}
