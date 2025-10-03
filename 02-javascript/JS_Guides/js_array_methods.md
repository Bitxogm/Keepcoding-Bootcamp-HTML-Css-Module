# Métodos de Arrays en JavaScript

## Tabla de Contenidos
- [Métodos Mutadores (Modifican el array original)](#métodos-mutadores)
- [Métodos de Acceso (No modifican el array original)](#métodos-de-acceso)
- [Métodos de Iteración](#métodos-de-iteración)
- [Métodos de Búsqueda](#métodos-de-búsqueda)
- [Métodos de Transformación](#métodos-de-transformación)

---

## Métodos Mutadores
*Modifican el array original*

### `push()`
Añade uno o más elementos al final del array.

```javascript
const frutas = ['manzana', 'banana'];
frutas.push('naranja');
console.log(frutas); // ['manzana', 'banana', 'naranja']

// Múltiples elementos
frutas.push('uva', 'pera');
console.log(frutas); // ['manzana', 'banana', 'naranja', 'uva', 'pera']
```

### `pop()`
Elimina y devuelve el último elemento del array.

```javascript
const numeros = [1, 2, 3, 4];
const ultimo = numeros.pop();
console.log(ultimo); // 4
console.log(numeros); // [1, 2, 3]
```

### `unshift()`
Añade uno o más elementos al inicio del array.

```javascript
const colores = ['rojo', 'verde'];
colores.unshift('azul');
console.log(colores); // ['azul', 'rojo', 'verde']
```

### `shift()`
Elimina y devuelve el primer elemento del array.

```javascript
const letras = ['a', 'b', 'c'];
const primera = letras.shift();
console.log(primera); // 'a'
console.log(letras); // ['b', 'c']
```

### `splice()`
Cambia el contenido del array eliminando elementos existentes y/o agregando nuevos.

```javascript
const animales = ['perro', 'gato', 'ratón', 'pájaro'];

// Eliminar elementos
animales.splice(1, 2); // Desde índice 1, eliminar 2 elementos
console.log(animales); // ['perro', 'pájaro']

// Agregar elementos
animales.splice(1, 0, 'león', 'tigre'); // En índice 1, eliminar 0, agregar 'león', 'tigre'
console.log(animales); // ['perro', 'león', 'tigre', 'pájaro']

// Reemplazar elementos
animales.splice(1, 1, 'elefante'); // En índice 1, eliminar 1, agregar 'elefante'
console.log(animales); // ['perro', 'elefante', 'tigre', 'pájaro']
```

### `sort()`
Ordena los elementos del array.

```javascript
const numeros = [3, 1, 4, 1, 5];
numeros.sort();
console.log(numeros); // [1, 1, 3, 4, 5]

// Con función de comparación
const personas = [
  { nombre: 'Ana', edad: 25 },
  { nombre: 'Carlos', edad: 30 },
  { nombre: 'Beatriz', edad: 20 }
];

personas.sort((a, b) => a.edad - b.edad);
console.log(personas);
// [{ nombre: 'Beatriz', edad: 20 }, { nombre: 'Ana', edad: 25 }, { nombre: 'Carlos', edad: 30 }]
```

### `reverse()`
Invierte el orden de los elementos del array.

```javascript
const numeros = [1, 2, 3, 4, 5];
numeros.reverse();
console.log(numeros); // [5, 4, 3, 2, 1]
```

### `fill()`
Llena todos los elementos del array con un valor estático.

```javascript
const arr = [1, 2, 3, 4];
arr.fill(0);
console.log(arr); // [0, 0, 0, 0]

// Con índices
const arr2 = [1, 2, 3, 4, 5];
arr2.fill('x', 1, 4); // Llenar desde índice 1 hasta 4 (no incluido)
console.log(arr2); // [1, 'x', 'x', 'x', 5]
```

---

## Métodos de Acceso
*No modifican el array original*

### `slice()`
Devuelve una copia superficial de una porción del array.

```javascript
const frutas = ['manzana', 'banana', 'naranja', 'uva', 'pera'];
const algunas = frutas.slice(1, 3);
console.log(algunas); // ['banana', 'naranja']
console.log(frutas); // Array original sin modificar

// Sin parámetro final
const desde2 = frutas.slice(2);
console.log(desde2); // ['naranja', 'uva', 'pera']
```

### `concat()`
Combina dos o más arrays sin modificar los originales.

```javascript
const arr1 = [1, 2];
const arr2 = [3, 4];
const arr3 = [5, 6];

const combinado = arr1.concat(arr2, arr3);
console.log(combinado); // [1, 2, 3, 4, 5, 6]
console.log(arr1); // [1, 2] - sin modificar
```

### `join()`
Crea y devuelve una nueva cadena concatenando todos los elementos del array.

```javascript
const palabras = ['Hola', 'mundo', 'JavaScript'];
const frase = palabras.join(' ');
console.log(frase); // 'Hola mundo JavaScript'

const numeros = [1, 2, 3, 4];
const csv = numeros.join(',');
console.log(csv); // '1,2,3,4'
```

### `toString()`
Devuelve una cadena representando el array.

```javascript
const numeros = [1, 2, 3, 4];
console.log(numeros.toString()); // '1,2,3,4'
```

---

## Métodos de Iteración

### `forEach()`
Ejecuta una función para cada elemento del array.

```javascript
const numeros = [1, 2, 3, 4];

numeros.forEach((numero, indice) => {
  console.log(`Índice ${indice}: ${numero}`);
});
// Índice 0: 1
// Índice 1: 2
// Índice 2: 3
// Índice 3: 4
```

### `map()`
Crea un nuevo array con los resultados de aplicar una función a cada elemento.

```javascript
const numeros = [1, 2, 3, 4];
const cuadrados = numeros.map(num => num * num);
console.log(cuadrados); // [1, 4, 9, 16]

const personas = [
  { nombre: 'Ana', edad: 25 },
  { nombre: 'Carlos', edad: 30 }
];
const nombres = personas.map(persona => persona.nombre);
console.log(nombres); // ['Ana', 'Carlos']
```

### `filter()`
Crea un nuevo array con todos los elementos que pasan una prueba.

```javascript
const numeros = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
const pares = numeros.filter(num => num % 2 === 0);
console.log(pares); // [2, 4, 6, 8, 10]

const personas = [
  { nombre: 'Ana', edad: 25 },
  { nombre: 'Carlos', edad: 17 },
  { nombre: 'Beatriz', edad: 30 }
];
const adultos = personas.filter(persona => persona.edad >= 18);
console.log(adultos); // [{ nombre: 'Ana', edad: 25 }, { nombre: 'Beatriz', edad: 30 }]
```

### `reduce()`
Aplica una función reductora sobre cada elemento del array, devolviendo un único valor.

```javascript
const numeros = [1, 2, 3, 4];
const suma = numeros.reduce((acumulador, actual) => acumulador + actual, 0);
console.log(suma); // 10

// Encontrar el máximo
const maximo = numeros.reduce((max, actual) => actual > max ? actual : max);
console.log(maximo); // 4

// Contar elementos
const frutas = ['manzana', 'banana', 'manzana', 'naranja', 'banana'];
const conteo = frutas.reduce((acc, fruta) => {
  acc[fruta] = (acc[fruta] || 0) + 1;
  return acc;
}, {});
console.log(conteo); // { manzana: 2, banana: 2, naranja: 1 }
```

### `reduceRight()`
Como `reduce()`, pero procesa el array de derecha a izquierda.

```javascript
const numeros = [1, 2, 3, 4];
const resultado = numeros.reduceRight((acc, actual) => acc - actual);
console.log(resultado); // -2 (4 - 3 - 2 - 1)
```

---

## Métodos de Búsqueda

### `find()`
Devuelve el primer elemento que cumple con la condición.

```javascript
const numeros = [5, 12, 8, 130, 44];
const encontrado = numeros.find(num => num > 10);
console.log(encontrado); // 12

const personas = [
  { nombre: 'Ana', edad: 25 },
  { nombre: 'Carlos', edad: 30 }
];
const persona = personas.find(p => p.nombre === 'Ana');
console.log(persona); // { nombre: 'Ana', edad: 25 }
```

### `findIndex()`
Devuelve el índice del primer elemento que cumple con la condición.

```javascript
const numeros = [5, 12, 8, 130, 44];
const indice = numeros.findIndex(num => num > 10);
console.log(indice); // 1
```

### `indexOf()`
Devuelve el primer índice donde se encuentra el elemento.

```javascript
const frutas = ['manzana', 'banana', 'naranja', 'banana'];
console.log(frutas.indexOf('banana')); // 1
console.log(frutas.indexOf('uva')); // -1 (no encontrado)
```

### `lastIndexOf()`
Devuelve el último índice donde se encuentra el elemento.

```javascript
const frutas = ['manzana', 'banana', 'naranja', 'banana'];
console.log(frutas.lastIndexOf('banana')); // 3
```

### `includes()`
Determina si un array incluye un elemento determinado.

```javascript
const numeros = [1, 2, 3, 4, 5];
console.log(numeros.includes(3)); // true
console.log(numeros.includes(6)); // false
```

---

## Métodos de Transformación

### `flat()`
Aplana un array anidado hasta la profundidad especificada.

```javascript
const anidado = [1, 2, [3, 4, [5, 6]]];
console.log(anidado.flat()); // [1, 2, 3, 4, [5, 6]]
console.log(anidado.flat(2)); // [1, 2, 3, 4, 5, 6]

// Aplanar completamente
const muyAnidado = [1, [2, [3, [4, [5]]]]];
console.log(muyAnidado.flat(Infinity)); // [1, 2, 3, 4, 5]
```

### `flatMap()`
Primero mapea cada elemento usando una función, luego aplana el resultado.

```javascript
const frases = ['Hola mundo', 'JavaScript es genial'];
const palabras = frases.flatMap(frase => frase.split(' '));
console.log(palabras); // ['Hola', 'mundo', 'JavaScript', 'es', 'genial']
```

---

## Métodos de Validación

### `every()`
Verifica si todos los elementos pasan una prueba.

```javascript
const numeros = [2, 4, 6, 8];
const todosPares = numeros.every(num => num % 2 === 0);
console.log(todosPares); // true

const edades = [18, 22, 25, 17];
const todosAdultos = edades.every(edad => edad >= 18);
console.log(todosAdultos); // false
```

### `some()`
Verifica si al menos un elemento pasa una prueba.

```javascript
const numeros = [1, 3, 5, 8];
const hayPares = numeros.some(num => num % 2 === 0);
console.log(hayPares); // true

const edades = [16, 17, 15];
const hayAdultos = edades.some(edad => edad >= 18);
console.log(hayAdultos); // false
```

---

## Métodos Estáticos de Array

### `Array.from()`
Crea una nueva instancia de Array a partir de un objeto iterable.

```javascript
// Desde string
const letras = Array.from('Hola');
console.log(letras); // ['H', 'o', 'l', 'a']

// Con función de mapeo
const numeros = Array.from({length: 5}, (_, i) => i + 1);
console.log(numeros); // [1, 2, 3, 4, 5]

// Desde NodeList
const divs = document.querySelectorAll('div');
const arrayDivs = Array.from(divs);
```

### `Array.of()`
Crea una nueva instancia de Array con un número variable de argumentos.

```javascript
const arr1 = Array.of(7); // [7]
const arr2 = Array.of(1, 2, 3); // [1, 2, 3]

// Comparar con constructor Array
const arr3 = Array(7); // [ , , , , , , ] (7 elementos vacíos)
const arr4 = Array.of(7); // [7]
```

### `Array.isArray()`
Determina si el valor pasado es un Array.

```javascript
console.log(Array.isArray([1, 2, 3])); // true
console.log(Array.isArray('texto')); // false
console.log(Array.isArray({length: 3})); // false
```

---

## Ejemplos Prácticos Combinando Métodos

### Procesamiento de datos
```javascript
const ventas = [
  { producto: 'Laptop', precio: 1000, cantidad: 2 },
  { producto: 'Mouse', precio: 25, cantidad: 10 },
  { producto: 'Teclado', precio: 75, cantidad: 5 },
  { producto: 'Monitor', precio: 300, cantidad: 3 }
];

// Calcular el total de ventas por producto y filtrar los mayores a 200
const ventasAltas = ventas
  .map(venta => ({
    ...venta,
    total: venta.precio * venta.cantidad
  }))
  .filter(venta => venta.total > 200)
  .sort((a, b) => b.total - a.total);

console.log(ventasAltas);
// [
//   { producto: 'Laptop', precio: 1000, cantidad: 2, total: 2000 },
//   { producto: 'Monitor', precio: 300, cantidad: 3, total: 900 },
//   { producto: 'Teclado', precio: 75, cantidad: 5, total: 375 },
//   { producto: 'Mouse', precio: 25, cantidad: 10, total: 250 }
// ]
```

### Agrupación de datos
```javascript
const estudiantes = [
  { nombre: 'Ana', curso: 'JavaScript', nota: 85 },
  { nombre: 'Carlos', curso: 'Python', nota: 90 },
  { nombre: 'Beatriz', curso: 'JavaScript', nota: 92 },
  { nombre: 'David', curso: 'Python', nota: 88 }
];

// Agrupar por curso
const porCurso = estudiantes.reduce((grupos, estudiante) => {
  const curso = estudiante.curso;
  if (!grupos[curso]) {
    grupos[curso] = [];
  }
  grupos[curso].push(estudiante);
  return grupos;
}, {});

console.log(porCurso);
// {
//   JavaScript: [
//     { nombre: 'Ana', curso: 'JavaScript', nota: 85 },
//     { nombre: 'Beatriz', curso: 'JavaScript', nota: 92 }
//   ],
//   Python: [
//     { nombre: 'Carlos', curso: 'Python', nota: 90 },
//     { nombre: 'David', curso: 'Python', nota: 88 }
//   ]
// }
```

Este documento cubre los métodos de arrays más utilizados en JavaScript. Cada método tiene su propósito específico y pueden combinarse para realizar operaciones complejas de manipulación de datos de manera eficiente y legible.