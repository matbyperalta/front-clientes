import { Component, OnInit } from '@angular/core';
import { SimpleChanges } from '@angular/core/src/metadata/lifecycle_hooks';
import { ActivatedRoute, Router } from '@angular/router';
import { RespuestaGeneral } from 'src/app/services/respuestageneral';
import { Cliente } from '../../models/cliente';
import { Cuenta } from '../../models/cuenta';
import { ClienteService } from '../../services/cliente.service';
import { CuentaService } from '../../services/cuenta.service';

@Component({
  selector: 'app-modificar-cliente',
  templateUrl: './modificar-cliente.component.html',
  styleUrls: ['./modificar-cliente.component.css'],
  providers: [ClienteService, CuentaService]
})
export class ModificarClienteComponent implements OnInit {

  public id: string;
  public clientes: Cliente[];
  public cliente: Cliente;
  error: boolean = false;
  exito: boolean = false;
  advertencia: boolean = false;
  procesando: boolean = false;
  public cuentas: Cuenta[];
  public cuentasSesion: Cuenta[];
  cuenta: Cuenta;

  public respuestageneral: RespuestaGeneral;

  constructor(private _route: ActivatedRoute, private _router: Router, private _clienteservice: ClienteService, private _cuentaservie: CuentaService) {
    this.id = _route.snapshot.paramMap.get('id');
    this.respuestageneral = new RespuestaGeneral('','',null);
  }

  ngOnInit() {
    var idCliente: number = +this.id;
    this.procesando = true;
    this._clienteservice.getCliente(idCliente).subscribe(data => {
      if(data.codigo == 'OK'){
        this.cliente = data.datos;
      }else if(data.codigo == 'ERROR'){
        this.error = true;
        this.respuestageneral.mensaje = data.mensaje;
      }
    })

    this._cuentaservie.getCuentas(idCliente).subscribe(data => {
      if(data.codigo == 'OK'){
        this.cuentas = data.datos;
      }else if(data.codigo == 'ERROR'){
        this.advertencia = true;
        this.respuestageneral.mensaje = data.mensaje;
      }
      this.procesando = false;
    })
    

  }

  onSubmit() {
    console.log("hola");
    var idCliente: number = +this.id;
    this.procesando = true;
    this._clienteservice.putCliente(this.cliente, idCliente).subscribe(data => {
      if(data.codigo == 'OK'){
        this.exito = true;
      }else if(data.codigo == 'ERROR'){
        this.error = true;
        this.respuestageneral.mensaje = data.mensaje;
      }
      this.procesando = false;
    })
  }

  onCloseAlert() {
    this.exito = false;
    this.error = false;
    this.advertencia = false;
  }

  eliminar() {
    var idCliente: number = +this.id;
    this.procesando = true;
    this._clienteservice.deleteCliente(idCliente).subscribe(data => {
      if(data.codigo == 'OK'){
        this.exito = true;
        this._router.navigate(['/home']);
      }else if(data.codigo == 'ERROR'){
        this.error = true;
        this.respuestageneral.mensaje = data.mensaje;
      }
      this.procesando = false;
    })
  }

  crearCuenta() {
    var idCliente: number = +this.id;
    this.procesando = true;
    this.advertencia = false;
    this.error = false;
    this._cuentaservie.crearCuenta(idCliente).subscribe(data => {
      if(data.codigo == 'OK'){
        this.exito = true;
      }else if(data.codigo == 'ERROR'){
        this.error = true;
        this.respuestageneral.mensaje = data.mensaje;
      }
    })

    this._cuentaservie.getCuentas(idCliente).subscribe(data => {
      console.log(data.datos);
      if(data.codigo == 'OK'){
        this.exito = true;
        this.cuentas = data.datos;
      }else if(data.codigo == 'ERROR'){
        this.error = true;
        this.respuestageneral.mensaje = data.mensaje;
      }
      this.procesando = false;
    })
  }

  ngOnChanges(changes: SimpleChanges) {
    console.log("cambio");
    
  }
}
