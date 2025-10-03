/*
Ejericio Calculadora con closures

Crear una calculadora con las siguientes funciones:
*/

/**
 * @typedef {Object} CalculatorInterface
 * @property {function(number): void} sumar - Añade un número al total acumulado. No devuelve valor (void).
 * @property {function(number): void} restar - Resta un número al total acumulado. No devuelve valor (void).
 * @property {function(number): void} multiplicar - Multiplica el total acumulado por un número. No devuelve valor (void).
 * @property {function(number): void} dividir - Divide el total acumulado por un número. No devuelve valor (void).
 * @property {function(): number} total - Devuelve el valor actual del acumulador.
 */

/**
 * Crea y devuelve un objeto calculadora con un estado interno privado (Clausura).
 * El estado se inicializa a 0.
 *
 * @returns {CalculatorInterface} El objeto que contiene los métodos de operación.
 */
const calculadora = () => {
  let acum = 0;
  const sumar = (num) => { acum += num }
  const restar = (num) => { acum -= num }
  const multiplicar = (num) => { acum *= num }
  const dividir = (num) => { acum /= num }
  const total = () => acum
  return {
    sumar,
    restar,
    multiplicar,
    dividir,
    total
  }
};

const miCalculadora = calculadora();

console.log(miCalculadora.sumar(5)); // Debería imprimir undefined
console.log(miCalculadora.restar(2)); // Debería imprimir undefined
console.log(miCalculadora.multiplicar(4)); // Debería imprimir undefined
console.log(miCalculadora.dividir(2)); // Debería imprimir undefined
console.log(miCalculadora.sumar(10)); // Debería imprimir undefined
console.log(miCalculadora.total()); // Debería imprimir 16


/**
 * @typedef {Object} CalculatorInterface
 * @property {function(number): void} add - Adds a number to the accumulated total.
 * @property {function(number): void} subtract - Subtracts a number from the accumulated total.
 * @property {function(number): void} multiply - Multiplies the accumulated total by a number.
 * @property {function(number): void} divide - Divides the accumulated total by a number.
 * @property {function(): number} total - Returns the accumulated total.
 */

/**
 * Creates and returns a calculator object with private internal state (Closure).
 * The state is initialized to 0.
 *
 * @returns {CalculatorInterface} Object that contains the operations.
 */
const calculator = () => {
  let acum = 0;

  const validate = (num) => {
    if (typeof num !== 'number' )
      throw new Error(`${num} must be a number`)
  }

 const operations = {
    add: (num) => { validate(num), acum += num },
    subtract: (num) => { validate(num), acum -= num },
    multiply: (num) => { validate(num), acum *= num },
    divide: (num) => { validate(num), acum /= num },
    total: () => { return acum },
  }
  return operations;
}

const myCalculator = calculator();
console.log(myCalculator.add(5))
console.log(myCalculator.subtract(2))
console.log(myCalculator.multiply(4))
console.log(myCalculator.divide(2))
console.log(myCalculator.add(10))
console.log(myCalculator.total())

