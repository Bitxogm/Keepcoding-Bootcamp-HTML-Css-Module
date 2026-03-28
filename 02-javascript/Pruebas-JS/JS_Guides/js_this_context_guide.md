# Guía Completa de this y Contexto en JavaScript

## Tabla de Contenidos
- [¿Qué es this?](#qué-es-this)
- [Reglas de Binding](#reglas-de-binding)
- [call(), apply(), bind()](#call-apply-bind)
- [Arrow Functions y this](#arrow-functions-y-this)
- [this en Clases](#this-en-clases)
- [Problemas Comunes](#problemas-comunes)
- [Casos de Uso Prácticos](#casos-de-uso-prácticos)

---

## ¿Qué es this?

`this` es una palabra clave que se refiere al contexto de ejecución de una función. Su valor depende de **cómo** se llama la función, no de **dónde** se define.

### Concepto fundamental
```javascript
const persona = {
  nombre: 'Ana',
  saludar: function() {
    console.log(this.nombre); // 'this' se refiere al objeto persona
  }
};

persona.saludar(); // 'Ana'

// Pero si extraemos la función...
const saludarSolo = persona.saludar;
saludarSolo(); // undefined (this ya no es persona)
```

---

## Reglas de Binding

Existen 4 reglas que determinan el valor de `this`:

### 1. Default Binding (Enlace por defecto)

Cuando una función se llama sin contexto específico.

```javascript
function mostrarThis() {
  console.log(this);
}

mostrarThis(); 
// En navegador: Window
// En Node.js (modo no estricto): global
// En modo estricto: undefined

'use strict';
function mostrarThisEstricto() {
  console.log(this);
}

mostrarThisEstricto(); // undefined
```

### 2. Implicit Binding (Enlace implícito)

Cuando una función es llamada como método de un objeto.

```javascript
const persona = {
  nombre: 'Ana',
  edad: 25,
  saludar: function() {
    console.log(`Hola, soy ${this.nombre}`);
  },
  cumpleaños: function() {
    this.edad++;
    console.log(`Ahora tengo ${this.edad} años`);
  }
};

persona.saludar();    // 'Hola, soy Ana' (this = persona)
persona.cumpleaños(); // 'Ahora tengo 26 años' (this = persona)
```

### Pérdida de binding implícito
```javascript
const persona = {
  nombre: 'Ana',
  saludar: function() {
    console.log(`Hola, soy ${this.nombre}`);
  }
};

// Pérdida del contexto
const saludarSolo = persona.saludar;
saludarSolo(); // 'Hola, soy undefined' (this = global/undefined)

// Con callback
setTimeout(persona.saludar, 1000); // 'Hola, soy undefined'
```

### 3. Explicit Binding (Enlace explícito)

Usando call(), apply(), o bind() para establecer this manualmente.

```javascript
function saludar() {
  console.log(`Hola, soy ${this.nombre}`);
}

const persona1 = { nombre: 'Ana' };
const persona2 = { nombre: 'Carlos' };

saludar.call(persona1);  // 'Hola, soy Ana'
saludar.call(persona2);  // 'Hola, soy Carlos'
```

### 4. new Binding (Enlace con new)

Cuando se usa el operador `new`, se crea un nuevo objeto y `this` se refiere a él.

```javascript
function Persona(nombre, edad) {
  this.nombre = nombre;
  this.edad = edad;
  this.saludar = function() {
    console.log(`Hola, soy ${this.nombre}`);
  };
}

const ana = new Persona('Ana', 25);
ana.saludar(); // 'Hola, soy Ana' (this = instancia creada)

console.log(ana.nombre); // 'Ana'
console.log(ana.edad);   // 25
```

### Orden de precedencia

1. **new binding** (mayor prioridad)
2. **Explicit binding** (call, apply, bind)
3. **Implicit binding** (método de objeto)
4. **Default binding** (menor prioridad)

```javascript
function saludar() {
  console.log(this.nombre);
}

const persona = { nombre: 'Ana' };
const otraPersona = { nombre: 'Carlos' };

// Implicit binding
persona.saludar = saludar;
persona.saludar(); // 'Ana'

// Explicit binding tiene prioridad sobre implicit
persona.saludar.call(otraPersona); // 'Carlos'

// new tiene la mayor prioridad
function Persona(nombre) {
  this.nombre = nombre;
}

const boundPersona = Persona.bind(persona);
const nueva = new boundPersona('Beatriz');
console.log(nueva.nombre); // 'Beatriz' (new gana sobre bind)
```

---

## call(), apply(), bind()

### call()
Llama a una función con un `this` específico y argumentos individuales.

```javascript
function presentar(profesion, ciudad) {
  console.log(`Soy ${this.nombre}, ${profesion} de ${ciudad}`);
}

const persona = { nombre: 'Ana' };

presentar.call(persona, 'desarrolladora', 'Madrid');
// 'Soy Ana, desarrolladora de Madrid'
```

### apply()
Similar a call(), pero los argumentos se pasan como array.

```javascript
function presentar(profesion, ciudad) {
  console.log(`Soy ${this.nombre}, ${profesion} de ${ciudad}`);
}

const persona = { nombre: 'Ana' };

presentar.apply(persona, ['desarrolladora', 'Madrid']);
// 'Soy Ana, desarrolladora de Madrid'
```

### Diferencia entre call y apply
```javascript
// call: argumentos separados
funcion.call(contexto, arg1, arg2, arg3);

// apply: argumentos en array
funcion.apply(contexto, [arg1, arg2, arg3]);

// Ejemplo práctico con Math.max
const numeros = [5, 6, 2, 3, 7];

console.log(Math.max.apply(null, numeros)); // 7

// Con spread (alternativa moderna)
console.log(Math.max(...numeros)); // 7
```

### bind()
Crea una nueva función con `this` fijado permanentemente.

```javascript
function saludar() {
  console.log(`Hola, soy ${this.nombre}`);
}

const persona = { nombre: 'Ana' };

const saludarAna = saludar.bind(persona);
saludarAna(); // 'Hola, soy Ana'

// bind no ejecuta, solo crea una nueva función
setTimeout(saludarAna, 1000); // 'Hola, soy Ana' (después de 1s)
```

### Aplicación parcial con bind
```javascript
function multiplicar(a, b) {
  return a * b;
}

const duplicar = multiplicar.bind(null, 2);
const triplicar = multiplicar.bind(null, 3);

console.log(duplicar(5));   // 10
console.log(triplicar(5));  // 15
```

### Casos prácticos de call/apply/bind

**Tomar prestados métodos de arrays**
```javascript
// Convertir NodeList a Array
const divs = document.querySelectorAll('div');
const arrayDivs = Array.prototype.slice.call(divs);

// Alternativa moderna
const arrayDivs2 = Array.from(divs);
```

**Herencia de métodos**
```javascript
function Persona(nombre) {
  this.nombre = nombre;
}

function Empleado(nombre, puesto) {
  Persona.call(this, nombre); // Llamar al constructor padre
  this.puesto = puesto;
}

const empleado = new Empleado('Ana', 'Desarrolladora');
console.log(empleado.nombre); // 'Ana'
console.log(empleado.puesto); // 'Desarrolladora'
```

---

## Arrow Functions y this

Las arrow functions NO tienen su propio `this`. Heredan `this` del contexto léxico donde fueron definidas.

### Comportamiento básico
```javascript
const persona = {
  nombre: 'Ana',
  saludar: function() {
    console.log(`Hola, soy ${this.nombre}`);
  },
  saludarArrow: () => {
    console.log(`Hola, soy ${this.nombre}`);
  }
};

persona.saludar();      // 'Hola, soy Ana'
persona.saludarArrow(); // 'Hola, soy undefined' (this = global)
```

### Arrow functions no pueden cambiar su this
```javascript
const persona = { nombre: 'Ana' };

const saludar = () => {
  console.log(this.nombre);
};

// Ninguno de estos cambia 'this'
saludar.call(persona);  // undefined
saludar.apply(persona); // undefined
saludar.bind(persona)(); // undefined
```

### Caso de uso correcto: Callbacks
```javascript
const persona = {
  nombre: 'Ana',
  tareas: ['estudiar', 'programar'],
  
  // PROBLEMA con función regular
  listarConProblema: function() {
    this.tareas.forEach(function(tarea) {
      console.log(`${this.nombre} debe ${tarea}`);
      // Error: this.nombre es undefined
    });
  },
  
  // SOLUCIÓN 1: Arrow function
  listarConArrow: function() {
    this.tareas.forEach(tarea => {
      console.log(`${this.nombre} debe ${tarea}`);
      // Funciona: hereda 'this' del método
    });
  },
  
  // SOLUCIÓN 2: bind
  listarConBind: function() {
    this.tareas.forEach(function(tarea) {
      console.log(`${this.nombre} debe ${tarea}`);
    }.bind(this));
  }
};

persona.listarConArrow();
// Ana debe estudiar
// Ana debe programar
```

### Arrow functions en métodos de objeto
```javascript
// MAL: Arrow function como método
const persona = {
  nombre: 'Ana',
  saludar: () => {
    console.log(this.nombre); // 'this' no es persona
  }
};

persona.saludar(); // undefined

// BIEN: Función regular como método
const persona2 = {
  nombre: 'Ana',
  saludar: function() {
    console.log(this.nombre); // 'this' es persona2
  }
};

persona2.saludar(); // 'Ana'

// BIEN: Arrow function dentro de método
const persona3 = {
  nombre: 'Ana',
  hobbies: ['leer', 'correr'],
  listarHobbies: function() {
    this.hobbies.forEach(hobby => {
      console.log(`${this.nombre} le gusta ${hobby}`);
    });
  }
};

persona3.listarHobbies();
// Ana le gusta leer
// Ana le gusta correr
```

---

## this en Clases

### Clases ES6
```javascript
class Persona {
  constructor(nombre, edad) {
    this.nombre = nombre;
    this.edad = edad;
  }
  
  saludar() {
    console.log(`Hola, soy ${this.nombre}`);
  }
  
  cumpleaños() {
    this.edad++;
    console.log(`Ahora tengo ${this.edad} años`);
  }
}

const ana = new Persona('Ana', 25);
ana.saludar();    // 'Hola, soy Ana'
ana.cumpleaños(); // 'Ahora tengo 26 años'
```

### Problema con métodos extraídos
```javascript
class Persona {
  constructor(nombre) {
    this.nombre = nombre;
  }
  
  saludar() {
    console.log(`Hola, soy ${this.nombre}`);
  }
}

const ana = new Persona('Ana');
ana.saludar(); // 'Hola, soy Ana'

const saludar = ana.saludar;
saludar(); // Error: this es undefined
```

### Soluciones para mantener el contexto

**1. Bind en el constructor**
```javascript
class Persona {
  constructor(nombre) {
    this.nombre = nombre;
    this.saludar = this.saludar.bind(this);
  }
  
  saludar() {
    console.log(`Hola, soy ${this.nombre}`);
  }
}

const ana = new Persona('Ana');
const saludar = ana.saludar;
saludar(); // 'Hola, soy Ana' (funciona)
```

**2. Arrow function como propiedad de clase**
```javascript
class Persona {
  constructor(nombre) {
    this.nombre = nombre;
  }
  
  saludar = () => {
    console.log(`Hola, soy ${this.nombre}`);
  }
}

const ana = new Persona('Ana');
const saludar = ana.saludar;
saludar(); // 'Hola, soy Ana' (funciona)
```

**3. Wrapper con bind al usar**
```javascript
const ana = new Persona('Ana');
setTimeout(ana.saludar.bind(ana), 1000);
```

---

## Problemas Comunes

### 1. Event listeners
```javascript
class Boton {
  constructor() {
    this.clicks = 0;
  }
  
  // PROBLEMA
  manejarClickMal() {
    this.clicks++; // Error: 'this' es el elemento DOM
    console.log(this.clicks);
  }
  
  // SOLUCIÓN 1: Bind
  inicializarConBind() {
    document.getElementById('btn')
      .addEventListener('click', this.manejarClick.bind(this));
  }
  
  // SOLUCIÓN 2: Arrow function
  manejarClick = () => {
    this.clicks++;
    console.log(this.clicks);
  }
  
  inicializar() {
    document.getElementById('btn')
      .addEventListener('click', this.manejarClick);
  }
}
```

### 2. Callbacks
```javascript
class Usuario {
  constructor(nombre) {
    this.nombre = nombre;
  }
  
  obtenerDatos() {
    // PROBLEMA
    fetch('/api/datos')
      .then(function(respuesta) {
        console.log(this.nombre); // undefined
      });
    
    // SOLUCIÓN: Arrow function
    fetch('/api/datos')
      .then(respuesta => {
        console.log(this.nombre); // 'Ana'
      });
  }
}
```

### 3. setTimeout/setInterval
```javascript
const persona = {
  nombre: 'Ana',
  
  // PROBLEMA
  saludarDespuesMal: function() {
    setTimeout(function() {
      console.log(`Hola, soy ${this.nombre}`);
    }, 1000);
  },
  
  // SOLUCIÓN: Arrow function
  saludarDespues: function() {
    setTimeout(() => {
      console.log(`Hola, soy ${this.nombre}`);
    }, 1000);
  }
};

persona.saludarDespues(); // 'Hola, soy Ana' (después de 1s)
```

---

## Casos de Uso Prácticos

### 1. Encadenamiento de métodos (Method Chaining)
```javascript
class Calculadora {
  constructor() {
    this.valor = 0;
  }
  
  sumar(n) {
    this.valor += n;
    return this; // Retornar this para encadenar
  }
  
  restar(n) {
    this.valor -= n;
    return this;
  }
  
  multiplicar(n) {
    this.valor *= n;
    return this;
  }
  
  obtener() {
    return this.valor;
  }
}

const calc = new Calculadora();
const resultado = calc
  .sumar(10)
  .multiplicar(2)
  .restar(5)
  .obtener();

console.log(resultado); // 15
```

### 2. Patrón Builder
```javascript
class QueryBuilder {
  constructor() {
    this.query = '';
  }
  
  select(...campos) {
    this.query = `SELECT ${campos.join(', ')}`;
    return this;
  }
  
  from(tabla) {
    this.query += ` FROM ${tabla}`;
    return this;
  }
  
  where(condicion) {
    this.query += ` WHERE ${condicion}`;
    return this;
  }
  
  build() {
    return this.query;
  }
}

const query = new QueryBuilder()
  .select('id', 'nombre', 'edad')
  .from('usuarios')
  .where('edad > 18')
  .build();

console.log(query);
// SELECT id, nombre, edad FROM usuarios WHERE edad > 18
```

### 3. Observer Pattern
```javascript
class Observable {
  constructor() {
    this.observers = [];
  }
  
  subscribe(fn) {
    this.observers.push(fn);
    return this;
  }
  
  unsubscribe(fn) {
    this.observers = this.observers.filter(observer => observer !== fn);
    return this;
  }
  
  notify(data) {
    this.observers.forEach(observer => observer.call(this, data));
    return this;
  }
}

const observable = new Observable();

observable.subscribe(function(data) {
  console.log('Observer 1:', data);
});

observable.subscribe(function(data) {
  console.log('Observer 2:', data);
});

observable.notify('Evento disparado');
// Observer 1: Evento disparado
// Observer 2: Evento disparado
```

### 4. Decoradores y wrappers
```javascript
function logger(fn) {
  return function(...args) {
    console.log(`Llamando a función con:`, args);
    const resultado = fn.apply(this, args);
    console.log(`Resultado:`, resultado);
    return resultado;
  };
}

class Calculadora {
  sumar(a, b) {
    return a + b;
  }
}

const calc = new Calculadora();
calc.sumar = logger(calc.sumar);

calc.sumar(5, 3);
// Llamando a función con: [5, 3]
// Resultado: 8
```

Entender `this` es crucial para escribir JavaScript efectivo, especialmente cuando trabajas con objetos, clases y programación orientada a eventos.