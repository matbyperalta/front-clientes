import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Clientes } from '../../models/clientes';
import { Cliente } from '../../models/cliente';
import { ControlContainer } from '@angular/forms';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  public clientes: Cliente[];

  seleccionado:boolean = false;

  constructor(
    private _router: Router
  ) {     
    
  }

  

  ngOnInit() {
    
    if(sessionStorage.getItem('clientes') != 'undefined'){
      this.clientes = JSON.parse(sessionStorage.getItem('clientes'));
    }

  }

  irModificar() {
    //this._router.navigate(['modificar']);
    this.seleccionado = true;
  }

  

}
