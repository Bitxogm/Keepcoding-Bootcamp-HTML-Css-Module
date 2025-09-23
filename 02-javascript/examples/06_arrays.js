
const myProducts = ['TV', 'PC', 'Cap'];
console.log(myProducts);
console.log(myProducts[0]);
console.log(myProducts[1]);
console.log(myProducts[2]);
console.log(myProducts[3]);
console.log(myProducts.length);
console.log(typeof myProducts);

const firstProductName = myProducts[0];
const secondProductName = myProducts[1];
const thirdProductName = myProducts[2];
const fourthProductName = myProducts[3] ? myProducts[3] : 'No hay producto 4';

const sameProducts = firstProductName.trim() === secondProductName.toLowerCase();
console.log(sameProducts);  

const newProduct = firstProductName.trim() === fourthProductName.toLowerCase();
console.log(newProduct);

myProducts.push('Guitarra');
console.log(myProducts);

myProducts.unshift('Guitarra 2');
console.log(myProducts);

myProducts.pop();
console.log(myProducts);

myProducts.shift();
console.log(myProducts);



