import { Component, OnInit } from '@angular/core';
import { Cliente } from 'src/app/models/cliente';
import { Cuenta } from 'src/app/models/cuenta';
import { Movimiento } from 'src/app/models/movimiento';

@Component({
  selector: 'app-consignar',
  templateUrl: './consignar.component.html',
  styleUrls: ['./consignar.component.css']
})
export class ConsignarComponent implements OnInit {

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
  public valorConsignar: number;

  constructor() {
    
    this.alertSuccess = false;
    this.alertWarning = false;
    this.mostrarDatos = false;
    this.valorConsignar = 0;
  }

  ngOnInit() {
    this.cuentaIn = new Cuenta(0, 0, 0);
    this.cuentaOut = new Cuenta(0, 0, 0);
    this.cliente = new Cliente(0, '', '', '', '');
    this.movimiento = new Movimiento(0, 0, 0, new Date(),'');
    if (sessionStorage.getItem('cuentas') != 'undefined' && sessionStorage.getItem('cuentas') != null) {
      this.cuentas = JSON.parse(sessionStorage.getItem('cuentas'));
    } else {
      this.mensaje = 'No hay cuentas creadas';
      this.alertWarning = true
    }
  }

  onBuscarCuenta() {
    this.mostrarDatos = false;
    if (sessionStorage.getItem('cuentas') != 'undefined' && sessionStorage.getItem('cuentas') != null) {
      console.log(this.cuentaIn.numero);
      this.cuentas.forEach(element => {
        if (element.numero == this.cuentaIn.numero) {
          this.cuentaOut = element;
          this.mostrarDatos = true;
          console.log(this.cuentaOut);
        }
      });

      this.clientes = JSON.parse(sessionStorage.getItem('clientes'));
      this.clientes.forEach(element => {
        if (element.id == this.cuentaOut.idCliente) {
          this.cliente = element;
          console.log(this.cliente);
        }
      });

    } else {
      this.mensaje = 'No hay cuentas creadas';
      this.alertWarning = true
    }
  }

  onConsignar() {
    this.cuentaOut.saldo = this.cuentaOut.saldo + this.movimiento.valor;
    console.log(this.movimiento.tipo);
    for (let index = 0; index < this.cuentas.length; index++) {
      const element = this.cuentas[index];
      if (this.cuentaOut.numero == element.numero) {
        element.saldo = this.cuentaOut.saldo;
        this.cuentas[index] = element;
        sessionStorage.setItem('cuentas',JSON.stringify(this.cuentas));
      }
    }
    this.alertSuccess = true;
    this.mensaje = 'Operación Exitosa!';
  }

}
