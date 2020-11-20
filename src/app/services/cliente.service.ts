import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { Cliente } from '../models/cliente';
import { Global } from '../services/global';

const httpOptions = {
    headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'charset': 'UTF-8',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST',
        'Access-Control-Allow-Headers':'Content-Type, Authorization'
      })
};

@Injectable()
export class ClienteService{

    public url;
    public urlProxy;
    
constructor(
    private _http: HttpClient
){
    this.url = Global.urlApiRest;
    this.urlProxy = Global.urlProxy;
}

crearCliente(cliente: Cliente):Observable<any>{
    return this._http.post<any>(this.urlProxy+this.url+'crearCliente',cliente, httpOptions)
    .pipe(
        catchError((err, caught) => caught)
    );
}

getClientes(): Observable<any> {
    return this._http.get(this.urlProxy+this.url+'clientes')
    .pipe(
        catchError((err, caught) => caught)
    );
}

getCliente(id: number): Observable<any>{
    return this._http.get(this.urlProxy+this.url+'cliente/'+id)
    .pipe(
        catchError((err, caught) => caught)
    );
}

putCliente(cliente: Cliente, id: number):Observable<any>{
    return this._http.put<any>(this.urlProxy+this.url+'actualizarCliente/'+id,cliente, httpOptions)
    .pipe(
        catchError((err, caught) => caught)
    );
}

deleteCliente(id: number):Observable<any>{
    return this._http.delete<any>(this.urlProxy+this.url+'eliminarCliente/'+id, httpOptions)
    .pipe(
        catchError((err, caught) => caught)
    );
}

buscarCliente(nombre: string):Observable<any>{
    return this._http.get(this.urlProxy+this.url+'buscarCliente/'+nombre)
    .pipe(
        catchError((err, caught) => caught)
    );
}


private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      console.error('Un error ocurrio:', error.error.message);
    } else {
      console.error(
        'Backend responde codigo ${error.status},' +
        'cuerpo: ${error.error}');
    }
    return throwError(
      'Algo malo a sucedido; por favor tratar mas tarde.');
  }

}

