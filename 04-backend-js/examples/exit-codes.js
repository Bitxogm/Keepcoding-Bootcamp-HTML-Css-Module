'use strict';

const process = require('node:process');

process.on('exit', (code) => {
  console.log('Process exit event with code: ', code);
});

setTimeout(() => {
    console.log("Exit call...")
    // process.exit(0); // En este caso entiende que ha finalizaado bien.
    process.exit(10); // Si el código de error es diferente de 0 el sistema entiende que es un error.
}, 1000);