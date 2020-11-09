import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router} from '@angular/router'; 
import { Cliente } from '../../models/cliente';
import { Cuenta } from '../../models/cuenta';

@Component({
  selector: 'app-modificar-cliente',
  templateUrl: './modificar-cliente.component.html',
  styleUrls: ['./modificar-cliente.component.css']
})
export class ModificarClienteComponent implements OnInit {

  public id:string;
  public clientes: Cliente[];
  public cliente: Cliente;
  alert:boolean = false;
  public cuentas: Cuenta[];
  public cuentasSesion: Cuenta[];
  cuenta: Cuenta;

  constructor(private _route: ActivatedRoute, private _router: Router ) {
    this.id =_route.snapshot.paramMap.get('id');
  }

  ngOnInit() {
    this.clientes = JSON.parse(sessionStorage.getItem('clientes'));
    this.clientes.forEach(element => {
      if(element.id == parseInt(this.id)){
        this.cliente = element;
      }
    });
    
    if(sessionStorage.getItem('cuentas') != 'undefined' && sessionStorage.getItem('cuentas') != null){
      this.cuentas = []
        JSON.parse(sessionStorage.getItem('cuentas')).forEach(element => {
        if(element.idCliente == parseInt(this.id)){
          this.cuentas.push(element);
        }
      });
      
    }

  }

  onSubmit(){
    
    console.log(sessionStorage.getItem('clientes'));
    this.clientes[this.id] = this.cliente;
    sessionStorage.setItem('clientes',JSON.stringify(this.clientes));
    this.alert = true;

  }

  onCloseAlert(){
    this.alert = false;
  }

  eliminar(){
    this.clientes.splice(parseInt(this.id),1);  
    sessionStorage.setItem('clientes',JSON.stringify(this.clientes));
    this._router.navigate(['/home']);
  }

  crearCuenta(){

    if(sessionStorage.getItem('cuentas') != 'undefined' && sessionStorage.getItem('cuentas') != null){
      this.cuenta = new Cuenta(this.cliente.id,JSON.parse(sessionStorage.getItem('cuentas')).length+1,0);
      this.cuentas.push(this.cuenta);
      
      this.cuentasSesion = JSON.parse(sessionStorage.getItem('cuentas'));
      this.cuentasSesion.push(this.cuenta);
      sessionStorage.setItem('cuentas',JSON.stringify(this.cuentasSesion));
      
    }else{
      this.cuenta = new Cuenta(this.cliente.id,1,0);
      this.cuentas = [];
      this.cuentas.push(this.cuenta);
      this.cuentasSesion = this.cuentas;
      sessionStorage.setItem('cuentas',JSON.stringify(this.cuentasSesion));
    }

  }

}
