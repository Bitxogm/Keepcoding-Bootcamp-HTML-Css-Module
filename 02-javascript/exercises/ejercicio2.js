// Crea un programa que determine si un usuario puede recibir una promoción basada en su selección de productos.

// Instrucciones:

// Crea dos variables que representen el nombre de un producto seleccionado por el usuario y la cantidad. (En nuestro caso será usando prompt).
const selectedProduct = prompt('Ingresa el nombre del producto');
const selectedQuantity = parseInt(prompt('Ingresa la cantidad'));

const tShirt = 'T-shirt';
const cap = 'Cap';
let message = '';
if (selectedProduct === tShirt && selectedQuantity >= 2) {
  message = '¡Recibes un 10% de descuento en la segunda camiseta!';
} else if (selectedProduct === cap && selectedQuantity >= 3) {
  message = '¡Obtén una gorra gratis por la compra de 3!';
} else {
  message = 'No hay promociones para esta selección';
}

console.log(message);