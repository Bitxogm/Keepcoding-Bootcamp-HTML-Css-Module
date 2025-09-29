const productAName = "T-shirt";
const productAPrice = 20;
const productAQuantity = 2;

const productBName = "Cap";
const productBPrice = 35;
const productBQuantity = 1;

const productCName = "Socks";
const productCPrice = 10;
const productCQuantity = 3;

const totalPrice = (productAPrice * productAQuantity) + (productBPrice * productBQuantity) + (productCPrice * productCQuantity);
let message = "";

if(totalPrice < 50){
  message = "Puedes agregar mas productos";
} else if((totalPrice > 50) && (totalPrice <= 100)){
  message = "Esta cerca de tu limite de compra";
} else if(totalPrice > 100){
  message = "Has alcanzado el limite de tu compra";
}
console.log(`Total : ${totalPrice} , ${message}`);

// Calcula el precio total de todos los productos sumando los subtotales de cada uno (precio * cantidad).

// Usa una estructura condicional (if, else if, else) para mostrar un mensaje según el total:
// Si el total es menor a 50, muestra "Puedes agregar más productos".
// Si el total es entre 50 y 100, muestra "Estás cerca de tu límite de compra".
// Si el total es mayor a 100, muestra "Has alcanzado el límite de tu compra".

// Muestra el total y el mensaje en un único console.log.