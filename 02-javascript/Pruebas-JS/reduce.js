// Instrucción: Usa el método reduce() para calcular el Tiempo Total (la suma de la propiedad tiempo) solo para las tareas con una dificultad mayor a 7.
// Pista: Dentro de la callback de reduce(), usa una sentencia if para decidir si el elemento actual debe sumarse al acumulador.


const tareasModulo = [
    { nombre: 'Leer Docs React', dificultad: 4, tiempo: 2 },
    { nombre: 'Implementar Componente', dificultad: 9, tiempo: 5 },
    { nombre: 'Corregir Bug de CORS', dificultad: 8, tiempo: 4 },
    { nombre: 'Escribir CSS básico', dificultad: 3, tiempo: 1 },
    { nombre: 'Optimizar BBDD', dificultad: 10, tiempo: 6 },
];

const totalTime = tareasModulo.reduce((acum, tareaActual) => {
 if(tareaActual.dificultad > 7){
  return acum + tareaActual.tiempo
}else{
  return acum
}
},0)

console.log(totalTime);

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

const libros2000 = books.reduce((acum, libroActual ) => {
  if(libroActual.year >= 2000){
    return [...acum, libroActual.title]
  }else{
    return acum
  }

},[])

const booksFilterByYear = books.filter(libro => libro.year > 2000);
const titulosLbro2000 = booksFilterByYear.map(title => title.title)
console.log(titulosLbro2000)
console.log(libros2000)

  
const desarrolladores = [
    { nombre: 'Ana', habilidad: 'JavaScript', nivel: 'Junior' },
    { nombre: 'Juan', habilidad: 'Python', nivel: 'Senior' },
    { nombre: 'Luisa', habilidad: 'JavaScript', nivel: 'Senior' },
    { nombre: 'Pedro', habilidad: 'JavaScript', nivel: 'Junior' },
    { nombre: 'Sofía', habilidad: 'React', nivel: 'Senior' },
];

const developersJs = desarrolladores.filter(habilidad => habilidad.habilidad === 'JavaScript' && habilidad.nivel === 'Senior')
.map(developer => developer.nombre)
.join(',');
console.log(developersJs)
