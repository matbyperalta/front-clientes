export class Movimiento{
    constructor(
        public id: number,
        public numeroCuenta: number,
        public valor: number,
        public fecha: Date,
        public tipo: string
    ){

    }

}