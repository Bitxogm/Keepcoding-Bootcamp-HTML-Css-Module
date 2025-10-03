const firstProductName = 'T-shirt';
const firstProductPrice = 35;
const firstProductQuantity = 2;

const secondProductName = 'Cap';
const secondProductPrice = 35;
const secondProductQuantity = 2;

// objects

const firstProduct = {};

firstProduct.name = 'T-shirt';
firstProduct.price = 35;
firstProduct.quantity = 2;
firstProduct['total-price'] = 70 // Paa poder usar snake_case
firstProduct.sizes = ['L', 'XL', 'M'];
firstProduct.atributtes = {};
firstProduct.atributtes.color = 'red';
firstProduct.atributtes.material = 'cotton';
console.log(firstProduct);


/**
 * Representa un producto con sus detalles.
 * @type {{
 *   name: string,
 *   price: number,
 *   quantity: number,
 *   'total-price': number,
 *   available: boolean,
 *   sizes: string[],
 *   atributtes: {
 *     color: string,
 *     material: string
 *   }
 * }}
 */
const secondProduct = {
  name: secondProductName,
  price: 40,
  quantity: secondProductQuantity,
  'total-price': 120,
  available: false,
  sizes: ['L', 'M', 'Xl'],
  atributtes: {
    color: 'black',
    material: 'cotton',
  },
};
console.log(secondProduct);
console.log(secondProduct.sizes[0]);
console.log(secondProduct.atributtes.color);

const key = 'name';
secondProduct.quantity = 66;
console.log(secondProduct[key]);
console.log(secondProduct);

secondProduct.atributtes = {
  color: 'red',
  material: 'nylon',
  long: true
};
console.log(secondProduct);

//Borrar propiedades 
delete secondProduct.available;
console.log(secondProduct);


/**
 * 
 * @param {object} product 
 * @param {string} key 
 * @returns atributte
 */
const getProductAttribute = (product, key) => {
  return product[key];
};

console.log(getProductAttribute(secondProduct, 'atributtes'));
//Accedemos alas propiedades al prmer nivel
console.log(Object.keys(secondProduct));
console.log(Object.keys(secondProduct.atributtes));
// Acceder a los valores
console.log(Object.values(secondProduct));
//creaa un array key y value
console.log(Object.entries(firstProduct));


//listado de objetos
const products = [firstProduct, secondProduct]
console.log(products[1].atributtes.material);
console.log(products[0].sizes.join(', '));
console.clear();

const shows = [
  {
    id: 1,
    name: 'Under the dome',
    genres: ['Drama', 'Scienc-fiction', 'Thriler']
  },

  {
    id: 2,
    name: 'Game of thrones',
    genres: ['Drama'],
  },

  {
    id: 3,
    name: 'Monday',
    genres: ['Terror']
  }
];

const firstShow = shows[0];
const lastShow = shows[shows.length - 1];

console.log(firstShow.genres[1]);

let info = ''
for (const show of shows) {
  if (show.name === 'Under the dme') continue;
  info = `
    ${info}
    <h2>${show.name}</h2>
    <p>${show.genres.join(' - ')}</p>
  `;
};
// document.writeln(info);

try {
  console.log(JSON.stringify(firstProduct));
  const objFromString = JSON.parse('{"id": 1, "name": "bitxo", "age": 66}');
  console.log(objFromString);

} catch (error) {
  console.log(error)
}
console.log('Fin codigo');

const user = {
  email: 'jejej@.com',
  address: {
    street: 'kkk',
    number: 2,
  },
  name: undefined,
  zipcode: null,
  // test: ( ) => {}
};

console.log(user);
//Para hacer copias , hay 3 maneras :
const user1 = {
  ...user,
  address: {
    ...user.address
  }
} //Operador spread modifica el address.number, tenemos que hacer copia dentro del address del user tambien;
// const user2 = JSON.parse(JSON.stringify(user)); // undefined y las functions no los copia
//Structured clone no copia funciones
const user2 = structuredClone(user) //! <--- ! El mas apropiado !!!!!

user2.email = 'hjfgsdjkl@jjj';
user2.address.number = 66;
console.log(user);
console.log(user2);


//! En las funciones CUIDAO comprobar que no cambia la variabele original
const modifyEmail = (userData, value) => {
  const newEmail = structuredClone(userData)
  newEmail.email = value;
  return newEmail
};

const user3 = modifyEmail(user, 'value3@.com');
console.log(user3, user);
console.log(Object.entries(shows[0]));
console.log(Object.entries(shows[0]).flat());

for (const key in firstProduct) {
  const element = firstProduct[key];
  console.log(element);
}

console.clear();
const books = [
  { title: '1984', author: 'George Orwell', year: 1949 },
  {
    title: 'One Hundred Years of Solitude',
    author: 'Gabriel García Márquez',
    year: 1967,
  },
  {
    title: "Harry Potter and the Philosopher's Stone",
    author: 'J.K. Rowling',
    year: 1997,
  },
  { title: 'The Da Vinci Code', author: 'Dan Brown', year: 2003 },
  { title: 'Twilight', author: 'Stephenie Meyer', year: 2005 },
  { title: 'The Hunger Games', author: 'Suzanne Collins', year: 2008 },
];
//SACR por pantalla los libros despues del 2000
let year2000Books = [];
let arrayTitles = [];
for (const book of books) {
  if(book.year >= 2000){
    year2000Books = [...year2000Books, book];
    arrayTitles.push(book.title);
  }
}
console.log(year2000Books);
console.log(arrayTitles);

const get2000Books = (books ) =>  {
  let year2000Books = [];
  for (const book of books) {
  if(book.year >= 2000){
    year2000Books = [...year2000Books, book];
    arrayTitles.push(book.title);
  }
  return year2000Books
}
}


//destructuring objects and arrays
const {author, title} = { title: 'Twilight', author: 'Stephenie Meyer', year: 2005 };
const [pos0] = ['apple', 'kiwi', 'lemon'];
const [,pos1] = ['apple', 'kiwi', 'lemon'];
const [,,pos2] = ['apple', 'kiwi', 'lemon'];

console.log(author);
console.log(title)
console.log(pos0);
console.log(pos1);
console.log(pos2);