const firstProductName = 'T-shirt';
const firstProductPrice = 35;
const firstProductQuantity = 2;

const secondProductName = 'Cap';
const secondProductPrice = 35;
const secondProductQuantity = 2;

const discount = 20;
// 1-Definicion de la función


// JSDoc
/**
 * Calcula el precio total de un producto
 * @param {number} price -> precio
 * @param {number} quantity -> cantidad
 * @returns total
 */

const  calcProductPrice = (price, quantity) =>  price * quantity - discount;


const firstProductTotal = calcProductPrice(firstProductPrice, firstProductQuantity);
const secondProductTotal = calcProductPrice(secondProductPrice, secondProductQuantity);
console.log(firstProductTotal, secondProductTotal);














