'use strict';

function Persona(nombre) {
    this.activo = true;
    this.fechaAlta = new Date();
    this.nombre = nombre;
    // this.saluda = function() {
    //     console.log("Hola!! soy ", this.nombre);
    // }
}

Persona.prototype.saluda = function() {
    console.log("Hola!! soy ", this.nombre);
}

const pepe = new Persona('Pepe');
console.log(pepe);
pepe.saluda();

const maria = new Persona('Maria');
console.log(maria);
maria.saluda();

// Crear un tipo Estudiante, que herede de pesona.
// class Estudiante extends Persona
function Estudiante(nombre) {
    Persona.call(this, nombre) // super(nombre)
};
Object.setPrototypeOf(Estudiante.prototype, Persona.prototype);

const pedro = new Estudiante('Pedro');
console.log(pedro);
pedro.saluda();

const sonia = new Estudiante('Sonia');
console.log(sonia);
sonia.saluda();

// Class Estudiante extends Jugador, Persona

function Jugador() {
    this.chuta = function() {
        console.log("He chutado!");
    }
};
Object.assign(Estudiante.prototype, new Jugador());

pedro.chuta();

console.log(Estudiante.prototype);
console.log(pedro instanceof Estudiante);
console.log(pedro instanceof Persona);
console.log(pedro instanceof Jugador);