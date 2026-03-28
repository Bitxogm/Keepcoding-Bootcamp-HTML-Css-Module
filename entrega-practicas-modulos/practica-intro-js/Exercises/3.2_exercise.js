/* 3.2 Ejercicio
 Crea una función para que con estos datos de entrada se produzca los siguientes resultados:
 input -> '1-0'
 secondInput -> '1'
 thirdInput -> '1-1-2-3-4'
 */

// create your function here

/**
 * Separate the digits of a number with a hyphen (-).
 * This implementation uses non-mutating methods (split, join) for a functional approach.
 * @param {number} inputNumber - The number wose digits will be separated
 * @returns {string} A hyphen-separated string of the digits of the input number
*/
const separateNumber = (inputNumber) => {
  const stringInput = inputNumber.toString();
  const arrayInput = stringInput.split('');
  const output = arrayInput.join('-');
  return output
}

const input = 10;
const firstResult = separateNumber(input); // ->'1-0'
console.log(firstResult);

const secondInput = 1;
const secondResult = separateNumber(secondInput); // -> '1'
console.log(secondResult);

const thirdInput = 11234;
const thirdResult = separateNumber(thirdInput); // ->'1-1-2-3-4'
console.log(thirdResult);

// console.log(input);
// console.log(secondInput);
// console.log(thirdInput);