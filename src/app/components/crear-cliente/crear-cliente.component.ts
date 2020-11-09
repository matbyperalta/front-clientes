import { Component, OnInit } from '@angular/core';
import { Cliente } from 'src/app/models/cliente';

@Component({
  selector: 'app-crear-cliente',
  templateUrl: './crear-cliente.component.html',
  styleUrls: ['./crear-cliente.component.css']
})
export class CrearClienteComponent implements OnInit {

  public cliente: Cliente;
  alert:boolean = false;
  public clientes: Cliente[];

  constructor() { 
    this.cliente = new Cliente(0,'','','','',);
  }

  ngOnInit() {
  }

  onSubmit(){
    
    console.log(sessionStorage.getItem('clientes'));
    if(sessionStorage.getItem('clientes') != 'undefined' && sessionStorage.getItem('clientes') != null){
      this.clientes = JSON.parse(sessionStorage.getItem('clientes'));
      this.cliente.id = this.clientes.length+1;
      this.clientes.push(this.cliente);
      sessionStorage.setItem('clientes',JSON.stringify(this.clientes));
    }else{
      this.clientes = [];
      console.log(this.clientes);
      this.cliente.id = 1;
      this.clientes.push(this.cliente);
      sessionStorage.setItem('clientes',JSON.stringify(this.clientes));
    }
    console.log(sessionStorage.getItem('clientes'));
    this.cliente = new Cliente(0,'','','','',);
    this.alert = true;

  }

  onCloseAlert(){
    this.alert = false;
  }



}
