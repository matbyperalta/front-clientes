export class Movimiento {

    constructor(
        public movimiento: number,
        public numeroCuenta: number,
        public valor: number,
        public fecha: Date,
        public tipo: string
    ){}
}