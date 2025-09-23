console.log('03');
// ejemplos valores truthy
const valor1 = 32;
const valor2 = 'Hi';

const isTruthy = valor2 ? 'Verdadero' : 'Falso';
console.log(isTruthy);

// ejemplos valores falsy
const valor4 = 0;
const valor3 = '';
const valor5 = null;
const valor6 = undefined;
const valor7 = NaN;

console.log(valor4, valor4 ? 'Verdadero' : 'Falso');
console.log(valor5, valor5 ? 'Verdadero' : 'Falso');
console.log(valor6, valor6 ? 'Verdadero' : 'Falso');
console.log(valor7, valor7 ? 'Verdadero' : 'Falso');
console.clear();

const price = prompt('Ingrese el precio del producto');
let message = '';
if (price) {
  message = 'Tiene precio';
} else {
  message = 'No tiene precio';
}
console.log(message)