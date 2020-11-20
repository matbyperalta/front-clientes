import { Component, OnInit } from '@angular/core';
import { Cliente } from 'src/app/models/cliente';
import { RespuestaGeneral } from 'src/app/services/respuestageneral';
import { ClienteService } from '../../services/cliente.service';

@Component({
  selector: 'app-crear-cliente',
  templateUrl: './crear-cliente.component.html',
  styleUrls: ['./crear-cliente.component.css'],
  providers: [ClienteService]
})
export class CrearClienteComponent implements OnInit {

  public cliente: Cliente;
  public respuestageneral: RespuestaGeneral;

  exito:boolean = false;
  error:boolean = false;
  procesando:boolean = false;
  public clientes: Cliente[];

  constructor(
    private _clienteservice : ClienteService
  ) { 
    this.cliente = new Cliente(0,'','','','',);
    this.respuestageneral = new RespuestaGeneral('','',null);
  }

  ngOnInit() {
  }

  onSubmit(){
    this.procesando = true;
    this._clienteservice.crearCliente(this.cliente).subscribe(data => {
      if(data.codigo == 'OK'){
        this.exito = true;
        this.cliente = new Cliente(0,'','','','',);
      }else if(data.codigo == 'ERROR'){
        this.error = true;
        this.respuestageneral.mensaje = data.mensaje;
      }
      this.procesando = false;
    })
  }

  onCloseAlert(){
    this.exito = false;
    this.error = false;
  }



}
