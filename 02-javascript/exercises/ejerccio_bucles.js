/*
Dado este listado de valores, crea un programa que separe los números pares de los impares en dos arrays diferentes.
*/
const numbers = [1, 2, 33, 41, 5, 60, 74, 87, 90, 101, null, '', false, NaN, undefined, 'kaka', 'koko', 'kiki',{name: 'kk', age: 34666}];

let evenNumbers = []; // Array para almacenar números pares
let oddNumbers = [];  // Array para almacenar números impares
let strings = [];
let objects = [];
let others = [];

const listSeparator = (list) => {
  for (const element of list) {
    // Primero, verificamos si es un número válido
    if (typeof element === 'number' && !isNaN(element)) {
      // Si es un número, comprobamos si es par o impar
      if (element % 2 === 0) {
        evenNumbers.push(element);
      } else {
        oddNumbers.push(element);
      }
    } else if (typeof element === 'string') {
      // Si no es un número, verificamos si es un string
      strings.push(element);
    } else if (element !== null && typeof element === 'object') {
      // Verificamos que no sea null ANTES de comprobar si es un objeto
      objects.push(element);
    }else{
      others.push(element)
    }
    // Los otros tipos de datos (null, undefined, false) simplemente se ignoran.
  }
  // Devolvemos un objeto para poder acceder a los tres arrays
  return { strings, evenNumbers, oddNumbers, objects, others };
};

const result = listSeparator(numbers);

console.log(`Strings: [${result.strings.join(', ')}]`);
console.log(`Even numbers: [${result.evenNumbers.join(', ')}]`);
console.log(`Odd numbers: [${result.oddNumbers.join(', ')}]`);
console.log(`Objects: [${result.objects.map(obj => JSON.stringify(obj)).join(', ')}]`);
console.log(`Others: [${result.others.map(item => String(item)).join(', ')}]`);