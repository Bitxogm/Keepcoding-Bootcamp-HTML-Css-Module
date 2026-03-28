'use strict';

function Fruta(nombre) {
    this.nombre = nombre;
    // return this; // Lo añade JS al instanciar con new
    // this.saluda = function() {
    //     console.log("Hola soy ", this.nombre);
    // }
    this.saluda = () => {
        console.log("Hola soy ", this.nombre);
    }
};

const limon = new Fruta('limón');

console.log(limon);
limon.saluda();

setTimeout(limon.saluda.bind(limon), 2000);

const funcionSaludaDeLimon = limon.saluda;
funcionSaludaDeLimon(); // limon.funcionSaludaDeLimon();
