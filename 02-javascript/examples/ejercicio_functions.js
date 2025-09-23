// Crea una función para poder usar el código de la promoción de productos en el carrito de compras.
//  Esta función debe recibir el nombre del producto y la cantidad, y devolver un mensaje con la promoción aplicada.


// const selectedProduct = prompt('Ingresa el nombre del producto');
// const selectedQuantity = parseInt(prompt('Ingresa la cantidad'));

const tShirt = 'T-shirt';
const cap = 'Cap';


/**
 * Calcula el precio total de un producto
 * @param {string} product -> producto
 * @param {number} quantity -> cantidad
 * @returns total
 */
const article = (product, quantity) => {
  let message = '';
  if (product === tShirt && quantity >= 2) {
    message = '¡Recibes un 10% de descuento en la segunda camiseta!';
  } else if (product === cap && quantity >= 3) {
    message = '¡Obtén una gorra gratis por la compra de 3!';
  } else {
    message = 'No hay promociones para esta selección';
  }
  return message;
};

const product1 = article(tShirt, 2);
const product2 = article(cap, 3);
console.log(product1);
console.log(product2);




// if (selectedProduct === tShirt && selectedQuantity >= 2) {
//   message = '¡Recibes un 10% de descuento en la segunda camiseta!';
// } else if (selectedProduct === cap && selectedQuantity >= 3) {
//   message = '¡Obtén una gorra gratis por la compra de 3!';
// } else {
//   message = 'No hay promociones para esta selección';
// }

// console.log(message);

(() => {
  const product1 = article(tShirt, 2);
  const product2 = article(cap, 3);
  console.log(product1);
  console.log(product2);
})();