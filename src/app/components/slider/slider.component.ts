import { Component, OnInit } from '@angular/core';
import { Search } from 'src/app/models/search';
import { Cliente } from '../../models/cliente';
import { Router } from '@angular/router';
import { ClienteService } from '../../services/cliente.service';

@Component({
  selector: 'app-slider',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.css'],
  providers: [ClienteService]
})
export class SliderComponent implements OnInit {

  public buscar: Search;
  private clientes: Cliente[];
  public resultado: string;
  private busqueda: Cliente[];

  constructor(private _router: Router, private _clienteservice: ClienteService) {
    this.buscar = new Search('', 0,);
  }

  ngOnInit() {
  }

  onSubmit() {

    if (this.buscar.nombre != null && this.buscar.nombre.length > 1) {
      this.resultado = null;
      sessionStorage.setItem('busqueda', this.buscar.nombre);
      this._router.navigate(['/searchcliente']);
    } else {
      this.resultado = "Debe ingresar un nombre, o mas de una letra";
    }
  }

}
