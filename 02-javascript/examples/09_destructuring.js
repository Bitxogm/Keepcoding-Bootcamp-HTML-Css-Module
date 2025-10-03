const { author, year } = { title: 'Twlight', author: 'Stephenie Meuyer', year: 2005 };
const [, , pos2] = ['apple', 'kiwi', 'lemon'];

// Para usar el mismo nombre usamos alias
const { year: harrryPotterYear } = {
  title: "Harry Potter and the Philosopher's Stone",
  author: 'J.K. Rowling',
  year: 1997,
}

console.log(author, year, harrryPotterYear);
console.log(pos2);

// const  [, {year: yeardSecondShow}]
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

let year2000Books = [];
for (const { year, title } of books) {
  if (year > 2000) {
    year2000Books = [...year2000Books, title]
  }
}
console.log(year2000Books.join(', '));



const csvProducts = 'T-shirt,10,Amazon\nCap,5,Google\nPants,15,Amazon\nShoes,20,Google';
/**
 * 
 * @param {*} csv 
 * @returns 
 */
const processCSV = (csv) => {
  const products = [];
  const lines = csv.split('\n');
  for (const line of lines) {
    const [name, price, shop] = line.split(',')
    products.push({
      name,
      price: price * 2,
      shop,
    });
  }
  return products;
};

const products = processCSV(csvProducts);

let newCSV = ''
for (const {name, price, shop} of products) {
  newCSV = `${newCSV},${name},${price},${shop}`
}
console.log(newCSV); 
console.log(products);
console.clear()

// ...spread Operador
const infoGeneral = {
  profesores: [],
  alumnos: [],
  bootcamp: 'Keepcoding',
  name: 'General',
};

let modulo1 = {
  name: 'JS'
};

modulo1 = {
  ...infoGeneral,
  ...modulo1,
}
console.log(modulo1)

let modulo2 = {
  ...infoGeneral,
  name: 'HTML',
};
console.log(modulo2);
console.log(infoGeneral);

const {profesores, alumnos, ...rest} = {
  ...infoGeneral,
  name: 'SQL',
};
console.log(rest)