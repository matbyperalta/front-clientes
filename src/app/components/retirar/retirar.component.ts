import { Component, OnInit } from '@angular/core';
import { Cliente } from 'src/app/models/cliente';
import { Cuenta } from 'src/app/models/cuenta';
import { Movimiento } from 'src/app/models/movimiento';
import { MovimientoService } from '../../services/movimiento.service';
import { CuentaService } from '../../services/cuenta.service';
import { ClienteService } from '../../services/cliente.service';
import { Transaccion } from 'src/app/models/transaccion';

@Component({
  selector: 'app-retirar',
  templateUrl: './retirar.component.html',
  styleUrls: ['./retirar.component.css'],
  providers: [MovimientoService, CuentaService, ClienteService]
})
export class RetirarComponent implements OnInit {

  public cuentas: Cuenta[];
  public clientes: Cliente[];
  public cuentaIn: Cuenta;
  public cuentaOut: Cuenta;
  public movimiento: Movimiento;

  public cliente: Cliente;
  public mensaje: string;
  public alertWarning: boolean;
  public alertSuccess: boolean;
  public mostrarDatos: boolean;
  public procesando: boolean;
  private transaccion: Transaccion;

  constructor(private _movimientoservice: MovimientoService, private _cuentaservice: CuentaService, private _clienteservice: ClienteService) {

    this.alertSuccess = false;
    this.alertWarning = false;
    this.mostrarDatos = false;

    this.cuentaIn = {
      id: null,
      saldo: null,
      cliente: 0
    }

    this.cuentaOut = {
      id: null,
      saldo: null,
      cliente: 0
    }

    this.cliente = new Cliente(0, '', '', '', '');
    this.movimiento = {
      id: null,
      numeroCuenta: null,
      valor: 0,
      fecha: null,
      tipo: null
    }
  }

  ngOnInit() {

  }

  onBuscarCuenta() {
    this.procesando = true;
    this._cuentaservice.getCuenta(this.cuentaIn.id).subscribe(data => {
      if (data.codigo == 'OK') {
        if (data.datos != null) {
          this.cuentaOut = data.datos;

          this._clienteservice.getCliente(this.cuentaOut.cliente).subscribe(datacliente => {
            if (datacliente.codigo == 'OK') {
              if (datacliente.datos != null) {
                this.cliente = datacliente.datos;
              }
            }
          })

          this.mostrarDatos = true;
        } else {
          this.mostrarDatos = false;
          this.alertWarning = true;
          this.mensaje = "No hay cuentas creadas";
        }
      }
      this.procesando = false;
    })
  }

  onRetirar() {
    this.procesando = true;
    console.log(this.procesando);
    this.transaccion = new Transaccion(this.movimiento.valor, this.cuentaOut.id);
    this._movimientoservice.retirar(this.transaccion).subscribe(data => {
      if (data.codigo == 'OK') {
        this.alertSuccess = true;
        this.mensaje = 'Operación Exitosa!';
      } else if (data.codigo == 'ERROR') {
        this.alertWarning = true;
        this.mensaje = data.mensaje;
      }
    })

    this._cuentaservice.getCuenta(this.cuentaIn.id).subscribe(data => {
      if (data.codigo == 'OK') {
        if (data.datos != null) {
          this.cuentaOut = data.datos;
          this.mostrarDatos = false;
        }
      }
    })

    this.movimiento.valor = 0;
    this.procesando = false;
  }

  onCloseAlert() {
    this.alertWarning = false;
    this.alertSuccess = false;

}
