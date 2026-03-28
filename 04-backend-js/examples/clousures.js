'use strict'

function creaVehiculo(marca) {
    var numeroRuedas = 4;
    // return function() {
    //     console.log('Soy un vehiculo de marca ', marca, 'y tengo ', numeroRuedas, ' ruedas');
    // }
    return {
        // aqui no existe numeroRuedas;
        saluda: function() {
            console.log('Soy un vehiculo de marca ', marca, 'y tengo ', numeroRuedas, ' ruedas');
        },
        ponRuedas: function(num) {
            numeroRuedas = num;
        }
    }
};

const fiat = creaVehiculo('fiat');
fiat.ponRuedas(3);
fiat.saluda();
