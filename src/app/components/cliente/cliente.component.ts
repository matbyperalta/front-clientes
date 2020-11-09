import { Component, Input, OnInit } from '@angular/core';
import { Cliente } from 'src/app/models/cliente';

@Component({
  selector: 'app-cliente',
  templateUrl: './cliente.component.html',
  styleUrls: ['./cliente.component.css']
})
export class ClienteComponent implements OnInit {

  @Input() cliente: Cliente;

  constructor() { }

  ngOnInit() {
    console.log(this.cliente);
  }

}
