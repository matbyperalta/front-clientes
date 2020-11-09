import { Component, OnInit } from '@angular/core';
import { Search } from 'src/app/models/search';
import { Cliente } from '../../models/cliente';
import { Router} from '@angular/router'; 

@Component({
  selector: 'app-slider',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.css']
})
export class SliderComponent implements OnInit {

  public buscar: Search;
  private clientes: Cliente[];
  public resultado:string;
  private busqueda: Cliente[]; 

  constructor(private _router: Router) { 
    this.buscar = new Search('',0,);
  }

  ngOnInit() {
  }

  onSubmit(){
    if(sessionStorage.getItem('clientes') != 'undefined' && sessionStorage.getItem('clientes') != null){
      this.clientes = JSON.parse(sessionStorage.getItem('clientes'));
      if(this.buscar.nombre != null && this.buscar.nombre.length > 3){
        this.busqueda = [];
        this.clientes.forEach(element => {
          
          if(element.nombre.toLowerCase().includes(this.buscar.nombre.toLowerCase()) || element.apellido.toLowerCase().includes(this.buscar.nombre.toLowerCase())){
            this.busqueda.push(element);
            console.log("----"+this.buscar.nombre);
          }
        });
        if(this.busqueda.length>0){
          sessionStorage.setItem('busqueda',JSON.stringify(this.busqueda));
          this.resultado = null;
          this._router.navigate(['/searchcliente']);
        }else{
          this.resultado = "Cero datos encontrados";
        }
        
      }else{
        this.resultado = "Debe ingresar un nombre";
      }
   }else{
      this.resultado = "Cero datos encontrados";
    }
  }

}
