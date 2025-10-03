// Programacion funcional
// default params
// rest params
// cierres
// funciones como params



const suma = (num1, num2) => num1 + num2;
// console.log(suma (2, 2))

//clousures
const counter = () => {
  let points = 0;

  const addPoint = (amount = 1) => points = points + amount


  const getPoints = () => points

  return {
    addPoint,
    getPoints,
  };
};

const team1 = counter();// {addPoint, getPoints }
console.log(team1.getPoints())
team1.addPoint();
team1.addPoint();
console.log(team1.getPoints());

const team2 = counter();
team2.addPoint(200);
console.log(team2.getPoints());

const products = [
  { name: 'T-shirt', price: 20, quantity: 2 },
  { name: 'Cap', price: 5, quantity: 3 },
  { name: 'Pants', price: 50, quantity: 1 },
  { name: 'Shoes', price: 0, quantity: 0 },
];

const cart = () => {
  let products = [];

  const addProduct = ({ name, price, quantity }) => {
    if (name !== undefined && price !== undefined && quantity !== undefined) {
      products = [...products, {
        name,
        price,
        quantity
      }]
    }
  };

  const getProduct = () => products;
  return { addProduct, getProduct };
};

const user1 = cart()
user1.addProduct(products[0]);
user1.addProduct(products[2]);
user1.addProduct({
  prueba: '1234',
})

const user2 = cart()
for (const product of products) {
  user2.addProduct(product)
}
console.log(user1.getProduct());
console.log(user2.getProduct());
console.clear();

// funciones como params 
const operations = (num1, num2, operation) => {
  if (operation === 'suma') {
    return num1 + num2
  } else if (operation === 'resta') {
    return num1 - num2
  }
}

console.log(operations(2, 2, 'suma'));
console.log(operations(2, 2, 'resta'));

const operationsV2 = (num1, num2, callback) => {
  return callback(num1, num2);
};

const suma1 = (num1, num2) => num1 + num2
const resta1 = (num1, num2) => num1 - num2
const producto = (num1, num2) => num1 * num2
console.log(operationsV2(1, 2, suma1));
console.log(operationsV2(1, 2, resta1));
console.log(operationsV2(1, 2, producto));

operationsV2(1,2, (num1, num2)=> {
  return num1 * num2 +33
});