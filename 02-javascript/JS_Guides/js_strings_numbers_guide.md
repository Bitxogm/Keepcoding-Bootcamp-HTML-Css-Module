# Guía Completa de Strings y Numbers en JavaScript

## Tabla de Contenidos

### STRINGS
- [Creación de Strings](#creación-de-strings)
- [Propiedades de String](#propiedades-de-string)
- [Métodos de Búsqueda](#métodos-de-búsqueda-strings)
- [Métodos de Extracción](#métodos-de-extracción)
- [Métodos de Transformación](#métodos-de-transformación-strings)
- [Métodos de Formato](#métodos-de-formato)
- [Template Literals](#template-literals)

### NUMBERS
- [Creación de Numbers](#creación-de-numbers)
- [Propiedades de Number](#propiedades-de-number)
- [Métodos de Number](#métodos-de-number)
- [Métodos de Math](#métodos-de-math)
- [Conversiones Numéricas](#conversiones-numéricas)
- [Formateo de Números](#formateo-de-números)

---

# STRINGS

## Creación de Strings

### Literales de cadena
```javascript
const str1 = 'Hola mundo'; // Comillas simples
const str2 = "Hola mundo"; // Comillas dobles
const str3 = `Hola mundo`; // Template literals (backticks)

// Cadenas multilínea con template literals
const multilinea = `
  Esta es una
  cadena de texto
  multilínea
`;
```

### Constructor String
```javascript
const str = new String('Hola');
console.log(typeof str); // 'object'
console.log(str.valueOf()); // 'Hola'

// No recomendado, usar literales
const literal = 'Hola';
console.log(typeof literal); // 'string'
```

### Caracteres especiales
```javascript
const texto = 'Primera línea\nSegunda línea'; // Salto de línea
const tab = 'Columna1\tColumna2'; // Tabulación
const comilla = 'Ella dijo: \'Hola\''; // Comilla simple escapada
const barra = 'C:\\Users\\Documents'; // Barra invertida
const unicode = '\u00A9'; // Símbolo copyright ©
```

---

## Propiedades de String

### `length`
Devuelve la longitud de la cadena.

```javascript
const texto = 'Hola mundo';
console.log(texto.length); // 10

const vacio = '';
console.log(vacio.length); // 0

const emoji = '👋';
console.log(emoji.length); // 2 (algunos emojis ocupan 2 unidades)
```

---

## Métodos de Búsqueda (Strings)

### `indexOf()`
Devuelve el índice de la primera aparición.

```javascript
const texto = 'Hola mundo, hola javascript';
console.log(texto.indexOf('hola')); // 12
console.log(texto.indexOf('Hola')); // 0 (case-sensitive)
console.log(texto.indexOf('python')); // -1 (no encontrado)

// Desde una posición específica
console.log(texto.indexOf('hola', 13)); // 12
```

### `lastIndexOf()`
Devuelve el índice de la última aparición.

```javascript
const texto = 'Hola mundo, hola javascript';
console.log(texto.lastIndexOf('hola')); // 12
console.log(texto.lastIndexOf('o')); // 13
```

### `search()`
Busca usando expresiones regulares.

```javascript
const texto = 'Hola mundo 123';
console.log(texto.search('mundo')); // 5
console.log(texto.search(/\d+/)); // 11 (encuentra números)
console.log(texto.search(/MUNDO/i)); // 5 (case-insensitive)
```

### `includes()`
Verifica si una cadena contiene otra.

```javascript
const texto = 'JavaScript es genial';
console.log(texto.includes('Java')); // true
console.log(texto.includes('java')); // false (case-sensitive)
console.log(texto.includes('Python')); // false

// Desde una posición específica
console.log(texto.includes('es', 10)); // true
```

### `startsWith()`
Verifica si una cadena comienza con otra.

```javascript
const texto = 'JavaScript es genial';
console.log(texto.startsWith('Java')); // true
console.log(texto.startsWith('java')); // false
console.log(texto.startsWith('Script', 4)); // true (desde posición 4)
```

### `endsWith()`
Verifica si una cadena termina con otra.

```javascript
const archivo = 'documento.pdf';
console.log(archivo.endsWith('.pdf')); // true
console.log(archivo.endsWith('.doc')); // false

const texto = 'JavaScript';
console.log(texto.endsWith('Script')); // true
console.log(texto.endsWith('Java', 4)); // true (solo primeros 4 caracteres)
```

### `match()`
Busca coincidencias con expresiones regulares.

```javascript
const texto = 'Aprender JavaScript en 2025';

console.log(texto.match(/\d+/)); // ['2025', index: 22, ...]
console.log(texto.match(/[A-Z]/g)); // ['A', 'J', 'S']
console.log(texto.match(/python/)); // null (no encontrado)

// Con grupos de captura
const email = 'usuario@ejemplo.com';
const resultado = email.match(/(\w+)@(\w+)\.(\w+)/);
console.log(resultado[1]); // 'usuario'
console.log(resultado[2]); // 'ejemplo'
console.log(resultado[3]); // 'com'
```

### `matchAll()`
Devuelve un iterador con todas las coincidencias.

```javascript
const texto = 'test1 test2 test3';
const regex = /test(\d)/g;

for (const match of texto.matchAll(regex)) {
  console.log(`Encontrado: ${match[0]}, número: ${match[1]}`);
}
// Encontrado: test1, número: 1
// Encontrado: test2, número: 2
// Encontrado: test3, número: 3
```

---

## Métodos de Extracción

### `charAt()`
Devuelve el carácter en una posición específica.

```javascript
const texto = 'JavaScript';
console.log(texto.charAt(0)); // 'J'
console.log(texto.charAt(4)); // 'S'
console.log(texto.charAt(100)); // '' (vacío, fuera de rango)
```

### `charCodeAt()`
Devuelve el código Unicode del carácter.

```javascript
const texto = 'ABC';
console.log(texto.charCodeAt(0)); // 65
console.log(texto.charCodeAt(1)); // 66
console.log(texto.charCodeAt(2)); // 67
```

### `slice()`
Extrae una sección de la cadena.

```javascript
const texto = 'JavaScript';
console.log(texto.slice(0, 4)); // 'Java'
console.log(texto.slice(4)); // 'Script'
console.log(texto.slice(-6)); // 'Script' (desde el final)
console.log(texto.slice(-6, -2)); // 'Scri'
```

### `substring()`
Similar a slice, pero no acepta índices negativos.

```javascript
const texto = 'JavaScript';
console.log(texto.substring(0, 4)); // 'Java'
console.log(texto.substring(4)); // 'Script'
console.log(texto.substring(-3)); // 'JavaScript' (trata negativos como 0)
```

### `substr()` (Deprecado)
Extrae desde una posición con una longitud específica.

```javascript
const texto = 'JavaScript';
console.log(texto.substr(4, 6)); // 'Script'
console.log(texto.substr(4)); // 'Script'
// ⚠️ Usar slice() en su lugar
```

---

## Métodos de Transformación (Strings)

### `toLowerCase()`
Convierte a minúsculas.

```javascript
const texto = 'JavaScript ES GENIAL';
console.log(texto.toLowerCase()); // 'javascript es genial'
```

### `toUpperCase()`
Convierte a mayúsculas.

```javascript
const texto = 'javascript es genial';
console.log(texto.toUpperCase()); // 'JAVASCRIPT ES GENIAL'
```

### `trim()`
Elimina espacios al inicio y al final.

```javascript
const texto = '   Hola mundo   ';
console.log(texto.trim()); // 'Hola mundo'
console.log(texto.trimStart()); // 'Hola mundo   '
console.log(texto.trimEnd()); // '   Hola mundo'
```

### `replace()`
Reemplaza la primera coincidencia.

```javascript
const texto = 'Hola mundo, hola javascript';
console.log(texto.replace('hola', 'Adiós')); 
// 'Hola mundo, Adiós javascript'

// Con expresión regular (global)
console.log(texto.replace(/hola/gi, 'Adiós')); 
// 'Adiós mundo, Adiós javascript'

// Con función
const resultado = 'precio: 100'.replace(/\d+/, (match) => match * 2);
console.log(resultado); // 'precio: 200'
```

### `replaceAll()`
Reemplaza todas las coincidencias.

```javascript
const texto = 'Hola mundo, hola javascript';
console.log(texto.replaceAll('hola', 'Adiós')); 
// 'Hola mundo, Adiós javascript'

console.log(texto.replaceAll(/hola/gi, 'Adiós')); 
// 'Adiós mundo, Adiós javascript'
```

### `split()`
Divide una cadena en un array.

```javascript
const texto = 'Hola,mundo,javascript';
console.log(texto.split(',')); // ['Hola', 'mundo', 'javascript']

const frase = 'Hola mundo';
console.log(frase.split(' ')); // ['Hola', 'mundo']
console.log(frase.split('')); // ['H', 'o', 'l', 'a', ' ', 'm', 'u', 'n', 'd', 'o']

// Con límite
console.log(texto.split(',', 2)); // ['Hola', 'mundo']
```

### `concat()`
Concatena cadenas.

```javascript
const str1 = 'Hola';
const str2 = 'mundo';
console.log(str1.concat(' ', str2)); // 'Hola mundo'

// Mejor usar template literals o +
console.log(`${str1} ${str2}`); // 'Hola mundo'
console.log(str1 + ' ' + str2); // 'Hola mundo'
```

### `repeat()`
Repite una cadena.

```javascript
const texto = 'Hola';
console.log(texto.repeat(3)); // 'HolaHolaHola'

const separador = '='.repeat(20);
console.log(separador); // '===================='
```

### `padStart()` y `padEnd()`
Rellena una cadena hasta una longitud específica.

```javascript
const numero = '5';
console.log(numero.padStart(3, '0')); // '005'
console.log(numero.padEnd(3, '0')); // '500'

const precio = '100';
console.log(precio.padStart(10, '*')); // '*******100'

// Formatear números
const tarjeta = '1234';
console.log(tarjeta.padStart(16, '*')); // '************1234'
```

---

## Métodos de Formato

### `localeCompare()`
Compara cadenas según la configuración regional.

```javascript
const a = 'reservar';
const b = 'resérvár';

console.log(a.localeCompare(b)); // -1, 0, o 1
console.log(a.localeCompare(b, 'es')); // Compara en español

// Ordenar array con acentos
const palabras = ['último', 'árbol', 'casa'];
palabras.sort((a, b) => a.localeCompare(b, 'es'));
console.log(palabras); // ['árbol', 'casa', 'último']
```

### `normalize()`
Normaliza la forma Unicode.

```javascript
const str1 = '\u00F1'; // ñ (un solo carácter)
const str2 = '\u006E\u0303'; // n + tilde combinado

console.log(str1 === str2); // false
console.log(str1.normalize() === str2.normalize()); // true
```

---

## Template Literals

### Interpolación de variables
```javascript
const nombre = 'Ana';
const edad = 25;

const mensaje = `Hola, soy ${nombre} y tengo ${edad} años`;
console.log(mensaje); // 'Hola, soy Ana y tengo 25 años'
```

### Expresiones
```javascript
const a = 10;
const b = 20;
console.log(`La suma es: ${a + b}`); // 'La suma es: 30'

const usuario = { nombre: 'Ana', edad: 25 };
console.log(`Nombre: ${usuario.nombre.toUpperCase()}`); // 'Nombre: ANA'
```

### Multilínea
```javascript
const html = `
  <div>
    <h1>Título</h1>
    <p>Contenido</p>
  </div>
`;
```

### Tagged Templates
```javascript
function etiqueta(strings, ...valores) {
  console.log(strings); // Array de strings literales
  console.log(valores); // Array de valores interpolados
  return strings.reduce((acc, str, i) => 
    acc + str + (valores[i] || ''), ''
  );
}

const nombre = 'Ana';
const edad = 25;
const resultado = etiqueta`Nombre: ${nombre}, Edad: ${edad}`;
console.log(resultado);
```

---

# NUMBERS

## Creación de Numbers

### Literales numéricos
```javascript
const entero = 42;
const decimal = 3.14;
const negativo = -10;
const exponencial = 5e3; // 5000
const binario = 0b1010; // 10
const octal = 0o12; // 10
const hexadecimal = 0xFF; // 255
```

### Constructor Number
```javascript
const num = Number('123');
console.log(num); // 123
console.log(typeof num); // 'number'

// No recomendado
const obj = new Number(123);
console.log(typeof obj); // 'object'
```

### Valores especiales
```javascript
const infinito = Infinity;
const negInfinito = -Infinity;
const noNumero = NaN; // Not a Number

console.log(1 / 0); // Infinity
console.log(-1 / 0); // -Infinity
console.log('texto' * 2); // NaN
```

---

## Propiedades de Number

### `Number.MAX_VALUE`
El número más grande representable.

```javascript
console.log(Number.MAX_VALUE); // 1.7976931348623157e+308
console.log(Number.MAX_VALUE * 2); // Infinity
```

### `Number.MIN_VALUE`
El número positivo más pequeño representable.

```javascript
console.log(Number.MIN_VALUE); // 5e-324
```

### `Number.MAX_SAFE_INTEGER`
El entero más grande que se puede representar con precisión.

```javascript
console.log(Number.MAX_SAFE_INTEGER); // 9007199254740991
console.log(Number.MAX_SAFE_INTEGER + 1); // 9007199254740992
console.log(Number.MAX_SAFE_INTEGER + 2); // 9007199254740992 (¡pierde precisión!)
```

### `Number.MIN_SAFE_INTEGER`
El entero más pequeño que se puede representar con precisión.

```javascript
console.log(Number.MIN_SAFE_INTEGER); // -9007199254740991
```

### `Number.POSITIVE_INFINITY` y `Number.NEGATIVE_INFINITY`
```javascript
console.log(Number.POSITIVE_INFINITY); // Infinity
console.log(Number.NEGATIVE_INFINITY); // -Infinity
```

### `Number.NaN`
```javascript
console.log(Number.NaN); // NaN
console.log(NaN === NaN); // false (NaN no es igual a nada, ni a sí mismo)
```

---

## Métodos de Number

### `isNaN()`
Verifica si un valor es NaN.

```javascript
console.log(Number.isNaN(NaN)); // true
console.log(Number.isNaN('texto')); // false (no convierte)
console.log(isNaN('texto')); // true (convierte primero)
```

### `isFinite()`
Verifica si un número es finito.

```javascript
console.log(Number.isFinite(42)); // true
console.log(Number.isFinite(Infinity)); // false
console.log(Number.isFinite(NaN)); // false
console.log(Number.isFinite('42')); // false (no convierte)
```

### `isInteger()`
Verifica si un número es entero.

```javascript
console.log(Number.isInteger(42)); // true
console.log(Number.isInteger(42.0)); // true
console.log(Number.isInteger(42.5)); // false
console.log(Number.isInteger('42')); // false
```

### `isSafeInteger()`
Verifica si un número es un entero seguro.

```javascript
console.log(Number.isSafeInteger(42)); // true
console.log(Number.isSafeInteger(9007199254740991)); // true
console.log(Number.isSafeInteger(9007199254740992)); // false
```

### `toFixed()`
Formatea un número con decimales fijos.

```javascript
const num = 3.14159;
console.log(num.toFixed(2)); // '3.14' (string)
console.log(num.toFixed(4)); // '3.1416'
console.log(num.toFixed(0)); // '3'

const precio = 19.99;
console.log(precio.toFixed(2)); // '19.99'
```

### `toPrecision()`
Formatea un número con precisión específica.

```javascript
const num = 123.456;
console.log(num.toPrecision(4)); // '123.5'
console.log(num.toPrecision(2)); // '1.2e+2'
console.log(num.toPrecision(6)); // '123.456'
```

### `toExponential()`
Formatea un número en notación exponencial.

```javascript
const num = 12345;
console.log(num.toExponential()); // '1.2345e+4'
console.log(num.toExponential(2)); // '1.23e+4'
```

### `toString()`
Convierte un número a string (puede especificar la base).

```javascript
const num = 255;
console.log(num.toString()); // '255'
console.log(num.toString(2)); // '11111111' (binario)
console.log(num.toString(8)); // '377' (octal)
console.log(num.toString(16)); // 'ff' (hexadecimal)
```

### `valueOf()`
Devuelve el valor primitivo.

```javascript
const num = new Number(42);
console.log(num.valueOf()); // 42
```

---

## Métodos de Math

### Redondeo

#### `Math.round()`
Redondea al entero más cercano.

```javascript
console.log(Math.round(4.5)); // 5
console.log(Math.round(4.4)); // 4
console.log(Math.round(-4.5)); // -4
```

#### `Math.floor()`
Redondea hacia abajo.

```javascript
console.log(Math.floor(4.9)); // 4
console.log(Math.floor(4.1)); // 4
console.log(Math.floor(-4.1)); // -5
```

#### `Math.ceil()`
Redondea hacia arriba.

```javascript
console.log(Math.ceil(4.1)); // 5
console.log(Math.ceil(4.9)); // 5
console.log(Math.ceil(-4.9)); // -4
```

#### `Math.trunc()`
Elimina la parte decimal.

```javascript
console.log(Math.trunc(4.9)); // 4
console.log(Math.trunc(-4.9)); // -4
```

### Valores absolutos y signos

#### `Math.abs()`
Valor absoluto.

```javascript
console.log(Math.abs(-5)); // 5
console.log(Math.abs(5)); // 5
console.log(Math.abs(-3.14)); // 3.14
```

#### `Math.sign()`
Signo del número (-1, 0, o 1).

```javascript
console.log(Math.sign(5)); // 1
console.log(Math.sign(-5)); // -1
console.log(Math.sign(0)); // 0
```

### Potencias y raíces

#### `Math.pow()`
Potencia.

```javascript
console.log(Math.pow(2, 3)); // 8
console.log(Math.pow(5, 2)); // 25

// Alternativa con operador **
console.log(2 ** 3); // 8
```

#### `Math.sqrt()`
Raíz cuadrada.

```javascript
console.log(Math.sqrt(16)); // 4
console.log(Math.sqrt(2)); // 1.4142135623730951
```

#### `Math.cbrt()`
Raíz cúbica.

```javascript
console.log(Math.cbrt(27)); // 3
console.log(Math.cbrt(8)); // 2
```

### Máximo y mínimo

#### `Math.max()`
Valor máximo.

```javascript
console.log(Math.max(1, 5, 3, 9, 2)); // 9
console.log(Math.max(...[1, 5, 3, 9, 2])); // 9 (con spread)

const numeros = [1, 5, 3, 9, 2];
console.log(Math.max(...numeros)); // 9
```

#### `Math.min()`
Valor mínimo.

```javascript
console.log(Math.min(1, 5, 3, 9, 2)); // 1
console.log(Math.min(...[1, 5, 3, 9, 2])); // 1
```

### Números aleatorios

#### `Math.random()`
Número aleatorio entre 0 y 1.

```javascript
console.log(Math.random()); // 0.123456789...

// Número entre 0 y 10
console.log(Math.random() * 10);

// Entero entre 1 y 10
console.log(Math.floor(Math.random() * 10) + 1);

// Función reutilizable
function randomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

console.log(randomInt(1, 100)); // Número entre 1 y 100
```

### Trigonometría

```javascript
console.log(Math.sin(Math.PI / 2)); // 1
console.log(Math.cos(Math.PI)); // -1
console.log(Math.tan(Math.PI / 4)); // 1

// Conversión grados a radianes
function gradosARadianes(grados) {
  return grados * (Math.PI / 180);
}

console.log(Math.sin(gradosARadianes(90))); // 1
```

### Constantes

```javascript
console.log(Math.PI); // 3.141592653589793
console.log(Math.E); // 2.718281828459045
console.log(Math.LN2); // 0.6931471805599453
console.log(Math.LN10); // 2.302585092994046
console.log(Math.SQRT2); // 1.4142135623730951
```

---

## Conversiones Numéricas

### `parseInt()`
Convierte string a entero.

```javascript
console.log(parseInt('42')); // 42
console.log(parseInt('42.99')); // 42
console.log(parseInt('42px')); // 42
console.log(parseInt('px42')); // NaN

// Con base
console.log(parseInt('FF', 16)); // 255
console.log(parseInt('1010', 2)); // 10
```

### `parseFloat()`
Convierte string a decimal.

```javascript
console.log(parseFloat('3.14')); // 3.14
console.log(parseFloat('3.14abc')); // 3.14
console.log(parseFloat('abc3.14')); // NaN
```

### `Number()`
Convierte a número.

```javascript
console.log(Number('42')); // 42
console.log(Number('3.14')); // 3.14
console.log(Number('42px')); // NaN
console.log(Number(true)); // 1
console.log(Number(false)); // 0
console.log(Number(null)); // 0
console.log(Number(undefined)); // NaN
```

### Operador unario `+`
```javascript
console.log(+'42'); // 42
console.log(+'3.14'); // 3.14
console.log(+true); // 1
console.log(+false); // 0
```

---

## Formateo de Números

### `toLocaleString()`
Formatea según configuración regional.

```javascript
const num = 1234567.89;

console.log(num.toLocaleString('es-ES')); // '1.234.567,89'
console.log(num.toLocaleString('en-US')); // '1,234,567.89'
console.log(num.toLocaleString('de-DE')); // '1.234.567,89'

// Con opciones
const precio = 1234.56;
console.log(precio.toLocaleString('es-ES', {
  style: 'currency',
  currency: 'EUR'
})); // '1.234,56 €'

console.log(precio.toLocaleString('en-US', {
  style: 'currency',
  currency: 'USD'
})); // '$1,234.56'
```

### `Intl.NumberFormat`
Formateador de números internacionalizado.

```javascript
const formateador = new Intl.NumberFormat('es-ES', {
  style: 'currency',
  currency: 'EUR'
});

console.log(formateador.format(1234.56)); // '1.234,56 €'

// Porcentajes
const porcentaje = new Intl.NumberFormat('es-ES', {
  style: 'percent'
});

console.log(porcentaje.format(0.75)); // '75 %'

// Unidades
const unidades = new Intl.NumberFormat('es-ES', {
  style: 'unit',
  unit: 'kilometer-per-hour'
});

console.log(unidades.format(120)); // '120 km/h'
```

Esta guía cubre los métodos más importantes y útiles para trabajar con strings y números en JavaScript, desde operaciones básicas hasta formateo avanzado y conversiones.