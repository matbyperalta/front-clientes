import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Observable } from 'rxjs';
import { typeWithParameters } from '@angular/compiler/src/render3/util';

@Injectable()
export class ChucknorrisService {

    public url: string;

    constructor(
        private _http: HttpClient
    ){
        this.url = 'https://api.chucknorris.io/jokes/random';
    }

    getJoke(): Observable<any>  {
        return this._http.get(this.url);
    }

}