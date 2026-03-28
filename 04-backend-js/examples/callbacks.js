'use strict';

function suma(a, b, callback) {
    const resultado = a + b;
    callback(resultado);
    return resultado;
};

//const resultado = suma(2, 5, function(res) {
//    console.log("Resultado: ", res);
// });

// Cuando se ejecute suma, pinta el resultado por consola;

//console.log(resultado);

// Hacer una función que reciba un texto y tras dos segundos lo escriba en la consola.

function escribeTrasDosSegundos(texto, callback) {
    setTimeout(() => {
        console.log(texto);
        callback();
    }, 2000);
};



// Llamarla dos veces (texto1 y texto2. Deben salir los textos con sus pausas correspondientes.

// escribeTrasDosSegundos('Texto 1', function () {
//     escribeTrasDosSegundos('Texto 2', function () {
//         escribeTrasDosSegundos('Texto 3', function () {
//             escribeTrasDosSegundos('Texto 4', function () {
//                 escribeTrasDosSegundos('Texto 5', function () {
//                     console.log('Fin!');
//                 });
//             });
//         });
//     });
// });

// Y si me lo piden 5 veces?


// TODO:
// Repitamos la llamada a escribeTras2Segundos varias veces ejecutar un total de N veces?
// Al finalizar escribe por consola "Final"
// Es posible con callbacks?

function serie(n, param, funcionCB, cbFinal) {
    if (n === 0) {
        // Queremos poder configurar esta acción final
        cbFinal();
        return;
    };
    // N veces tiene que llamar a la función que le digamos
    funcionCB(param, () => {
        serie(n-1, param, funcionCB, cbFinal)
    })
};

serie(5, 'texto de la función final', escribeTrasDosSegundos, () => {
    console.log("Final");
    // console log de "Final"
    serie(2, 'texto de la función end', escribeTrasDosSegundos, () => {
        console.log("End");
    }); // End
}); 


