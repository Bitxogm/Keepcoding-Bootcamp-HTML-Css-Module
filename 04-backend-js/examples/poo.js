'use strict';

class Persona {
    constructor(nombre) {
        this.nombre = nombre;
        this.fechaAlta = new Date();
        this.activo = true;
    };

    saluda() {
        console.log('Hola soy ' + this.nombre);
    }
};

const pepe = new Persona('Pepe');
console.log(pepe);
pepe.saluda();

const maria = new Persona('Maria');
console.log(maria);
maria.saluda();

class Estudiante extends Persona {
    constructor(nombre) {
        super(nombre);
    };
};

const pedro = new Estudiante('Pedro');
console.log(pedro);
pedro.saluda();

const sonia = new Estudiante('Sonia');
console.log(sonia);
sonia.saluda();

console.log(sonia instanceof Persona);
console.log(pedro instanceof Estudiante);

class Jugador {
    chuta() {
        console.log('He chutado!!');
    };
};


// En JS la heréncia doble no existe, solo podemos heredar de una clase
// class Pedro extends Estudiante, Jugador {

// }

// Con clases esto no nos funciona. No podemos alterar tan facilmente el prototipo
// Object.assign(Estudiante.prototype, new Jugador());
// pedro.chuta();

// La respuesta corta es que no se puede hacer.

// TODO: Hay una manera de "alterar" el comportamiento
// Lo resolvemos?