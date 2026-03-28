'use strict';

const EventEmitter = require('node:events');

const eventEmitter = new EventEmitter();

eventEmitter.on('customEvent', () => {
    console.log(Math.random());
    console.log('-> Custom event dispached');
});

eventEmitter.emit('customEvent');

// TODO: Crea una función que cada segundo genere un numero random (0,1), si es mayor que 0,5 se debe lanzar un evento llamado Mayoria
// TODO: Crea un listener para ese evento Mayoria
// TODO: el bucle debe ejecutarse 10 veces

let n = 0;
const interval = setInterval(() => {
    const random = Math.random();
    if (random > 0.5) {
        n++;
        eventEmitter.emit('Mayoria');
    }
    if (n === 2) {
        // clearInterval(interval);
        process.exit(0);
    };
}, 1000);

eventEmitter.on('Mayoria', () => {
    console.log('Es mayoría!!');
});