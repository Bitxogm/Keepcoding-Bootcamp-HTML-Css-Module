# Guía Completa de Objetos en JavaScript

## Tabla de Contenidos
- [Creación de Objetos](#creación-de-objetos)
- [Métodos para Recorrer Objetos](#métodos-para-recorrer-objetos)
- [Métodos de Object](#métodos-de-object)
- [JSON: Stringify y Parse](#json-stringify-y-parse)
- [Clonación de Objetos](#clonación-de-objetos)
- [Manipulación de Propiedades](#manipulación-de-propiedades)
- [Métodos Avanzados](#métodos-avanzados)

---

## Creación de Objetos

### Literal de objeto
```javascript
const persona = {
  nombre: 'Ana',
  edad: 25,
  ciudad: 'Madrid'
};
```

### Constructor Object
```javascript
const persona = new Object();
persona.nombre = 'Ana';
persona.edad = 25;
```

### Object.create()
```javascript
const personaProto = {
  saludar() {
    return `Hola, soy ${this.nombre}`;
  }
};

const persona = Object.create(personaProto);
persona.nombre = 'Ana';
console.log(persona.saludar()); // 'Hola, soy Ana'
```

### Constructor personalizado
```javascript
function Persona(nombre, edad) {
  this.nombre = nombre;
  this.edad = edad;
}

const persona = new Persona('Ana', 25);
```

### Clase (ES6+)
```javascript
class Persona {
  constructor(nombre, edad) {
    this.nombre = nombre;
    this.edad = edad;
  }
  
  saludar() {
    return `Hola, soy ${this.nombre}`;
  }
}

const persona = new Persona('Ana', 25);
```

---

## Métodos para Recorrer Objetos

### `Object.keys()`
Devuelve un array con las claves del objeto.

```javascript
const persona = {
  nombre: 'Ana',
  edad: 25,
  ciudad: 'Madrid'
};

const claves = Object.keys(persona);
console.log(claves); // ['nombre', 'edad', 'ciudad']

// Recorrer con forEach
Object.keys(persona).forEach(clave => {
  console.log(`${clave}: ${persona[clave]}`);
});
// nombre: Ana
// edad: 25
// ciudad: Madrid
```

### `Object.values()`
Devuelve un array con los valores del objeto.

```javascript
const persona = {
  nombre: 'Ana',
  edad: 25,
  ciudad: 'Madrid'
};

const valores = Object.values(persona);
console.log(valores); // ['Ana', 25, 'Madrid']

// Sumar todas las edades
const personas = [
  { nombre: 'Ana', edad: 25 },
  { nombre: 'Carlos', edad: 30 },
  { nombre: 'Beatriz', edad: 28 }
];

const edades = personas.map(p => p.edad);
const sumaEdades = edades.reduce((sum, edad) => sum + edad, 0);
console.log(sumaEdades); // 83
```

### `Object.entries()`
Devuelve un array de pares [clave, valor].

```javascript
const persona = {
  nombre: 'Ana',
  edad: 25,
  ciudad: 'Madrid'
};

const entradas = Object.entries(persona);
console.log(entradas);
// [['nombre', 'Ana'], ['edad', 25], ['ciudad', 'Madrid']]

// Recorrer con destructuring
Object.entries(persona).forEach(([clave, valor]) => {
  console.log(`${clave}: ${valor}`);
});

// Convertir a Map
const mapa = new Map(Object.entries(persona));
console.log(mapa.get('nombre')); // 'Ana'
```

### `for...in`
Itera sobre todas las propiedades enumerables.

```javascript
const persona = {
  nombre: 'Ana',
  edad: 25,
  ciudad: 'Madrid'
};

for (let clave in persona) {
  console.log(`${clave}: ${persona[clave]}`);
}
// nombre: Ana
// edad: 25
// ciudad: Madrid

// Con hasOwnProperty para evitar propiedades heredadas
for (let clave in persona) {
  if (persona.hasOwnProperty(clave)) {
    console.log(`${clave}: ${persona[clave]}`);
  }
}
```

### `Object.getOwnPropertyNames()`
Devuelve todas las propiedades (enumerables y no enumerables).

```javascript
const obj = Object.create({}, {
  propiedad1: { value: 'valor1', enumerable: true },
  propiedad2: { value: 'valor2', enumerable: false }
});

console.log(Object.keys(obj)); // ['propiedad1']
console.log(Object.getOwnPropertyNames(obj)); // ['propiedad1', 'propiedad2']
```

---

## Métodos de Object

### `Object.assign()`
Copia propiedades de uno o más objetos a un objeto destino.

```javascript
const objetivo = { a: 1, b: 2 };
const fuente = { b: 3, c: 4 };

const resultado = Object.assign(objetivo, fuente);
console.log(resultado); // { a: 1, b: 3, c: 4 }
console.log(objetivo); // { a: 1, b: 3, c: 4 } (modificado)

// Crear nuevo objeto sin modificar el original
const original = { a: 1, b: 2 };
const copia = Object.assign({}, original, { c: 3 });
console.log(copia); // { a: 1, b: 2, c: 3 }
console.log(original); // { a: 1, b: 2 } (sin modificar)
```

### `Object.freeze()`
Congela un objeto: no se pueden agregar, eliminar o modificar propiedades.

```javascript
const obj = {
  nombre: 'Ana',
  edad: 25
};

Object.freeze(obj);

obj.edad = 30; // No tiene efecto
obj.ciudad = 'Madrid'; // No tiene efecto
delete obj.nombre; // No tiene efecto

console.log(obj); // { nombre: 'Ana', edad: 25 }
console.log(Object.isFrozen(obj)); // true
```

### `Object.seal()`
Sella un objeto: no se pueden agregar ni eliminar propiedades, pero sí modificarlas.

```javascript
const obj = {
  nombre: 'Ana',
  edad: 25
};

Object.seal(obj);

obj.edad = 30; // Funciona
obj.ciudad = 'Madrid'; // No tiene efecto
delete obj.nombre; // No tiene efecto

console.log(obj); // { nombre: 'Ana', edad: 30 }
console.log(Object.isSealed(obj)); // true
```

### `Object.preventExtensions()`
Previene que se agreguen nuevas propiedades al objeto.

```javascript
const obj = {
  nombre: 'Ana'
};

Object.preventExtensions(obj);

obj.edad = 25; // No tiene efecto
obj.nombre = 'Carlos'; // Funciona
delete obj.nombre; // Funciona

console.log(Object.isExtensible(obj)); // false
```

### `Object.is()`
Compara si dos valores son iguales.

```javascript
console.log(Object.is(25, 25)); // true
console.log(Object.is('foo', 'foo')); // true
console.log(Object.is(NaN, NaN)); // true (diferente a ===)
console.log(Object.is(0, -0)); // false (diferente a ===)

// Comparación de objetos (por referencia)
const obj1 = { a: 1 };
const obj2 = { a: 1 };
console.log(Object.is(obj1, obj2)); // false
console.log(Object.is(obj1, obj1)); // true
```

---

## JSON: Stringify y Parse

### `JSON.stringify()`
Convierte un objeto JavaScript a una cadena JSON.

```javascript
const persona = {
  nombre: 'Ana',
  edad: 25,
  ciudad: 'Madrid',
  hobbies: ['leer', 'correr']
};

// Básico
const json = JSON.stringify(persona);
console.log(json);
// '{"nombre":"Ana","edad":25,"ciudad":"Madrid","hobbies":["leer","correr"]}'

// Con formato (pretty print)
const jsonFormatted = JSON.stringify(persona, null, 2);
console.log(jsonFormatted);
/*
{
  "nombre": "Ana",
  "edad": 25,
  "ciudad": "Madrid",
  "hobbies": [
    "leer",
    "correr"
  ]
}
*/

// Con reemplazo (filtrar propiedades)
const jsonFiltrado = JSON.stringify(persona, ['nombre', 'edad']);
console.log(jsonFiltrado); // '{"nombre":"Ana","edad":25}'

// Con función de reemplazo
const jsonCustom = JSON.stringify(persona, (key, value) => {
  if (typeof value === 'string') {
    return value.toUpperCase();
  }
  return value;
});
console.log(jsonCustom);
// '{"nombre":"ANA","edad":25,"ciudad":"MADRID","hobbies":["LEER","CORRER"]}'
```

### Limitaciones de JSON.stringify()
```javascript
const obj = {
  numero: 42,
  texto: 'Hola',
  booleano: true,
  nulo: null,
  indefinido: undefined, // Se omite
  funcion: function() {}, // Se omite
  simbolo: Symbol('test'), // Se omite
  fecha: new Date(), // Se convierte a string
  infinito: Infinity, // Se convierte a null
  nan: NaN // Se convierte a null
};

console.log(JSON.stringify(obj));
// '{"numero":42,"texto":"Hola","booleano":true,"nulo":null,"fecha":"2025-01-15T10:00:00.000Z","infinito":null,"nan":null}'
```

### `JSON.parse()`
Convierte una cadena JSON a un objeto JavaScript.

```javascript
const json = '{"nombre":"Ana","edad":25,"ciudad":"Madrid"}';
const persona = JSON.parse(json);

console.log(persona); // { nombre: 'Ana', edad: 25, ciudad: 'Madrid' }
console.log(persona.nombre); // 'Ana'
console.log(typeof persona); // 'object'

// Con función de transformación (reviver)
const jsonFecha = '{"nombre":"Ana","fechaNacimiento":"2000-01-15"}';
const personaConFecha = JSON.parse(jsonFecha, (key, value) => {
  if (key === 'fechaNacimiento') {
    return new Date(value);
  }
  return value;
});

console.log(personaConFecha.fechaNacimiento instanceof Date); // true
```

### Manejo de errores con JSON
```javascript
const jsonInvalido = '{"nombre": "Ana", edad: 25}'; // Sin comillas en 'edad'

try {
  const obj = JSON.parse(jsonInvalido);
} catch (error) {
  console.error('JSON inválido:', error.message);
}

// Validación antes de parsear
function parseJSONSafe(jsonString) {
  try {
    return JSON.parse(jsonString);
  } catch (error) {
    console.error('Error al parsear JSON:', error.message);
    return null;
  }
}
```

---

## Clonación de Objetos

### Copia superficial (Shallow Copy)

#### Spread operator
```javascript
const original = {
  nombre: 'Ana',
  edad: 25,
  hobbies: ['leer', 'correr']
};

const copia = { ...original };

copia.nombre = 'Carlos';
copia.hobbies.push('nadar');

console.log(original.nombre); // 'Ana' (no afectado)
console.log(original.hobbies); // ['leer', 'correr', 'nadar'] (afectado!)
```

#### Object.assign()
```javascript
const original = {
  nombre: 'Ana',
  edad: 25,
  direccion: { ciudad: 'Madrid' }
};

const copia = Object.assign({}, original);

copia.edad = 30;
copia.direccion.ciudad = 'Barcelona';

console.log(original.edad); // 25 (no afectado)
console.log(original.direccion.ciudad); // 'Barcelona' (afectado!)
```

### Copia profunda (Deep Copy)

#### JSON.stringify() + JSON.parse()
```javascript
const original = {
  nombre: 'Ana',
  edad: 25,
  direccion: {
    ciudad: 'Madrid',
    pais: 'España'
  },
  hobbies: ['leer', 'correr']
};

const copiaCompleta = JSON.parse(JSON.stringify(original));

copiaCompleta.direccion.ciudad = 'Barcelona';
copiaCompleta.hobbies.push('nadar');

console.log(original.direccion.ciudad); // 'Madrid' (no afectado)
console.log(original.hobbies); // ['leer', 'correr'] (no afectado)
```

**Limitaciones del método JSON:**
```javascript
const obj = {
  fecha: new Date(),
  funcion: () => console.log('Hola'),
  indefinido: undefined,
  simbolo: Symbol('test'),
  circular: null
};
obj.circular = obj; // Referencia circular

// JSON no puede clonar funciones, undefined, símbolos, fechas correctamente
const copia = JSON.parse(JSON.stringify(obj));
// Error: Converting circular structure to JSON
```

#### structuredClone() (Moderno)
```javascript
const original = {
  nombre: 'Ana',
  edad: 25,
  fecha: new Date(),
  direccion: {
    ciudad: 'Madrid'
  },
  hobbies: ['leer', 'correr']
};

const copiaCompleta = structuredClone(original);

copiaCompleta.direccion.ciudad = 'Barcelona';
console.log(original.direccion.ciudad); // 'Madrid' (no afectado)
console.log(copiaCompleta.fecha instanceof Date); // true
```

#### Función recursiva personalizada
```javascript
function deepClone(obj, hash = new WeakMap()) {
  // Manejar null y tipos primitivos
  if (obj === null || typeof obj !== 'object') {
    return obj;
  }
  
  // Manejar referencias circulares
  if (hash.has(obj)) {
    return hash.get(obj);
  }
  
  // Manejar Date
  if (obj instanceof Date) {
    return new Date(obj.getTime());
  }
  
  // Manejar Array
  if (Array.isArray(obj)) {
    const arrCopy = [];
    hash.set(obj, arrCopy);
    obj.forEach((item, index) => {
      arrCopy[index] = deepClone(item, hash);
    });
    return arrCopy;
  }
  
  // Manejar Object
  const objCopy = {};
  hash.set(obj, objCopy);
  Object.keys(obj).forEach(key => {
    objCopy[key] = deepClone(obj[key], hash);
  });
  
  return objCopy;
}

// Uso
const original = {
  nombre: 'Ana',
  direccion: {
    ciudad: 'Madrid'
  }
};

const copia = deepClone(original);
copia.direccion.ciudad = 'Barcelona';
console.log(original.direccion.ciudad); // 'Madrid'
```

---

## Manipulación de Propiedades

### `Object.defineProperty()`
Define una nueva propiedad o modifica una existente con control total.

```javascript
const obj = {};

Object.defineProperty(obj, 'nombre', {
  value: 'Ana',
  writable: true, // Se puede modificar
  enumerable: true, // Aparece en for...in y Object.keys()
  configurable: true // Se puede eliminar o reconfigurar
});

console.log(obj.nombre); // 'Ana'

// Propiedad de solo lectura
Object.defineProperty(obj, 'edad', {
  value: 25,
  writable: false,
  enumerable: true,
  configurable: false
});

obj.edad = 30; // No tiene efecto
console.log(obj.edad); // 25
```

### Getters y Setters
```javascript
const persona = {
  nombre: 'Ana',
  apellido: 'García',
  _edad: 25, // Propiedad "privada" por convención
  
  get nombreCompleto() {
    return `${this.nombre} ${this.apellido}`;
  },
  
  set nombreCompleto(valor) {
    const partes = valor.split(' ');
    this.nombre = partes[0];
    this.apellido = partes[1];
  },
  
  get edad() {
    return this._edad;
  },
  
  set edad(valor) {
    if (valor < 0) {
      throw new Error('La edad no puede ser negativa');
    }
    this._edad = valor;
  }
};

console.log(persona.nombreCompleto); // 'Ana García'
persona.nombreCompleto = 'Carlos Pérez';
console.log(persona.nombre); // 'Carlos'
console.log(persona.apellido); // 'Pérez'

persona.edad = 30;
console.log(persona.edad); // 30
// persona.edad = -5; // Error: La edad no puede ser negativa
```

### `Object.defineProperties()`
Define múltiples propiedades a la vez.

```javascript
const obj = {};

Object.defineProperties(obj, {
  nombre: {
    value: 'Ana',
    writable: true,
    enumerable: true
  },
  edad: {
    value: 25,
    writable: false,
    enumerable: true
  }
});

console.log(obj); // { nombre: 'Ana', edad: 25 }
```

### `Object.getOwnPropertyDescriptor()`
Obtiene el descriptor de una propiedad.

```javascript
const obj = {
  nombre: 'Ana'
};

const descriptor = Object.getOwnPropertyDescriptor(obj, 'nombre');
console.log(descriptor);
/*
{
  value: 'Ana',
  writable: true,
  enumerable: true,
  configurable: true
}
*/
```

---

## Métodos Avanzados

### `Object.fromEntries()`
Transforma un array de pares clave-valor en un objeto.

```javascript
const entradas = [
  ['nombre', 'Ana'],
  ['edad', 25],
  ['ciudad', 'Madrid']
];

const objeto = Object.fromEntries(entradas);
console.log(objeto); // { nombre: 'Ana', edad: 25, ciudad: 'Madrid' }

// Convertir Map a objeto
const mapa = new Map([
  ['a', 1],
  ['b', 2]
]);

const obj = Object.fromEntries(mapa);
console.log(obj); // { a: 1, b: 2 }

// Transformar objeto
const precios = { manzana: 1.5, banana: 0.8, naranja: 1.2 };
const preciosConIVA = Object.fromEntries(
  Object.entries(precios).map(([fruta, precio]) => [fruta, precio * 1.21])
);
console.log(preciosConIVA);
// { manzana: 1.815, banana: 0.968, naranja: 1.452 }
```

### `Object.hasOwn()` (ES2022)
Verifica si un objeto tiene una propiedad propia (no heredada).

```javascript
const obj = { nombre: 'Ana' };

console.log(Object.hasOwn(obj, 'nombre')); // true
console.log(Object.hasOwn(obj, 'toString')); // false (heredada)

// Alternativa antigua
console.log(obj.hasOwnProperty('nombre')); // true
```

### Destructuring con objetos
```javascript
const persona = {
  nombre: 'Ana',
  edad: 25,
  ciudad: 'Madrid',
  profesion: 'Desarrolladora'
};

// Destructuring básico
const { nombre, edad } = persona;
console.log(nombre); // 'Ana'
console.log(edad); // 25

// Con renombre
const { nombre: nombrePersona, edad: años } = persona;
console.log(nombrePersona); // 'Ana'

// Con valores por defecto
const { pais = 'España' } = persona;
console.log(pais); // 'España'

// Rest operator
const { nombre: n, ...resto } = persona;
console.log(resto); // { edad: 25, ciudad: 'Madrid', profesion: 'Desarrolladora' }
```

### Optional Chaining
```javascript
const usuario = {
  nombre: 'Ana',
  direccion: {
    ciudad: 'Madrid'
  }
};

// Sin optional chaining
const pais = usuario.direccion && usuario.direccion.pais;
console.log(pais); // undefined

// Con optional chaining
const paisSeguro = usuario.direccion?.pais;
console.log(paisSeguro); // undefined (no error)

// Con métodos
const resultado = usuario.metodoInexistente?.();
console.log(resultado); // undefined (no error)
```

---

## Comparación de Objetos

### Comparación superficial
```javascript
function compararSuperficial(obj1, obj2) {
  const keys1 = Object.keys(obj1);
  const keys2 = Object.keys(obj2);
  
  if (keys1.length !== keys2.length) {
    return false;
  }
  
  for (let key of keys1) {
    if (obj1[key] !== obj2[key]) {
      return false;
    }
  }
  
  return true;
}

const a = { x: 1, y: 2 };
const b = { x: 1, y: 2 };
console.log(compararSuperficial(a, b)); // true
```

### Comparación profunda
```javascript
function compararProfundo(obj1, obj2) {
  // Verificar si son el mismo objeto
  if (obj1 === obj2) return true;
  
  // Verificar si alguno es null
  if (obj1 == null || obj2 == null) return false;
  
  // Verificar si son del mismo tipo
  if (typeof obj1 !== 'object' || typeof obj2 !== 'object') {
    return obj1 === obj2;
  }
  
  // Obtener las claves
  const keys1 = Object.keys(obj1);
  const keys2 = Object.keys(obj2);
  
  // Verificar longitud
  if (keys1.length !== keys2.length) return false;
  
  // Comparar recursivamente cada propiedad
  for (let key of keys1) {
    if (!keys2.includes(key)) return false;
    if (!compararProfundo(obj1[key], obj2[key])) return false;
  }
  
  return true;
}

const obj1 = { a: 1, b: { c: 2 } };
const obj2 = { a: 1, b: { c: 2 } };
console.log(compararProfundo(obj1, obj2)); // true
```

Esta guía cubre los aspectos fundamentales y avanzados del trabajo con objetos en JavaScript, desde su creación hasta manipulación compleja, serialización y clonación.