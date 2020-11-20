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
export class CuentaService{

    public url;
    public urlProxy;
    
constructor(
    private _http: HttpClient
){
    this.url = Global.urlApiRest;
    this.urlProxy = Global.urlProxy;
}

crearCuenta(idCliente: number):Observable<any>{
    return this._http.post<any>(this.urlProxy+this.url+'crearCuenta/'+idCliente, httpOptions)
    .pipe(
        catchError((err, caught) => caught)
    );
}

getCuentas(idCliente: number): Observable<any>{
    return this._http.get(this.urlProxy+this.url+'cuentas/'+idCliente)
    .pipe(
        catchError((err, caught) => caught)
    );
}

getCuenta(idCuenta: number): Observable<any>{
    return this._http.get(this.urlProxy+this.url+'cuenta/'+idCuenta)
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

