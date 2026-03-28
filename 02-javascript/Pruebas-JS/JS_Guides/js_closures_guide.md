# Guía Completa de Closures en JavaScript

## Tabla de Contenidos
- [¿Qué es un Closure?](#qué-es-un-closure)
- [Conceptos Fundamentales](#conceptos-fundamentales)
- [Cómo Funcionan los Closures](#cómo-funcionan-los-closures)
- [Ejemplos Básicos](#ejemplos-básicos)
- [Casos de Uso Prácticos](#casos-de-uso-prácticos)
- [Patrones Comunes](#patrones-comunes)
- [Problemas y Soluciones](#problemas-y-soluciones)
- [Mejores Prácticas](#mejores-prácticas)

---

## ¿Qué es un Closure?

Un **closure** (clausura) es una función que tiene acceso a variables de su ámbito externo, incluso después de que la función externa haya terminado de ejecutarse.

### Definición técnica
Un closure se crea cuando una función interna hace referencia a variables de su función externa, y esa función interna es devuelta o pasada a otro contexto.

### Características clave
1. Una función dentro de otra función
2. La función interna accede a variables de la función externa
3. La función interna "recuerda" el entorno donde fue creada
4. Persiste el acceso a las variables incluso después de que la función externa termine

---

## Conceptos Fundamentales

### Scope (Ámbito)
```javascript
// Ámbito global
const global = 'Soy global';

function externa() {
  // Ámbito de función externa
  const externa = 'Soy de la función externa';
  
  function interna() {
    // Ámbito de función interna
    const interna = 'Soy de la función interna';
    
    console.log(global);  // Acceso a ámbito global
    console.log(externa); // Acceso a ámbito externo
    console.log(interna); // Acceso a ámbito local
  }
  
  interna();
}

externa();
```

### Lexical Scope (Ámbito Léxico)
El ámbito léxico significa que el acceso a variables se determina por la posición física del código.

```javascript
function externa() {
  const mensaje = 'Hola';
  
  function interna() {
    console.log(mensaje); // Puede acceder a 'mensaje'
  }
  
  interna();
}

externa(); // 'Hola'
```

---

## Cómo Funcionan los Closures

### Ejemplo básico
```javascript
function crearSaludo(saludo) {
  // Variable del ámbito externo
  return function(nombre) {
    // Función interna que forma el closure
    return `${saludo}, ${nombre}`;
  };
}

const saludoEspañol = crearSaludo('Hola');
const saludoIngles = crearSaludo('Hello');

console.log(saludoEspañol('Ana'));    // 'Hola, Ana'
console.log(saludoIngles('John'));    // 'Hello, John'
```

### ¿Qué está pasando?
1. `crearSaludo` se ejecuta y recibe un parámetro `saludo`
2. Devuelve una función que "recuerda" el valor de `saludo`
3. Cuando llamamos a `saludoEspañol('Ana')`, la función interna todavía puede acceder a `saludo = 'Hola'`
4. Cada llamada a `crearSaludo` crea un nuevo closure con su propio `saludo`

### Visualización del entorno léxico
```javascript
function contador() {
  let count = 0; // Variable privada
  
  return function() {
    count++;
    return count;
  };
}

const incrementar = contador();

console.log(incrementar()); // 1
console.log(incrementar()); // 2
console.log(incrementar()); // 3

// La variable 'count' NO es accesible desde fuera
// console.log(count); // ReferenceError
```

---

## Ejemplos Básicos

### 1. Contador simple
```javascript
function crearContador() {
  let count = 0;
  
  return {
    incrementar: function() {
      count++;
      return count;
    },
    decrementar: function() {
      count--;
      return count;
    },
    obtenerValor: function() {
      return count;
    }
  };
}

const contador = crearContador();
console.log(contador.incrementar());  // 1
console.log(contador.incrementar());  // 2
console.log(contador.decrementar());  // 1
console.log(contador.obtenerValor()); // 1
```

### 2. Variables privadas
```javascript
function crearPersona(nombre, edad) {
  // Variables privadas
  let _nombre = nombre;
  let _edad = edad;
  
  return {
    getNombre: function() {
      return _nombre;
    },
    setNombre: function(nuevoNombre) {
      _nombre = nuevoNombre;
    },
    getEdad: function() {
      return _edad;
    },
    setEdad: function(nuevaEdad) {
      if (nuevaEdad > 0) {
        _edad = nuevaEdad;
      }
    },
    saludar: function() {
      return `Hola, soy ${_nombre} y tengo ${_edad} años`;
    }
  };
}

const persona = crearPersona('Ana', 25);
console.log(persona.saludar());        // 'Hola, soy Ana y tengo 25 años'
persona.setNombre('María');
console.log(persona.getNombre());      // 'María'
// console.log(persona._nombre);       // undefined (privada)
```

### 3. Función que genera funciones
```javascript
function multiplicador(factor) {
  return function(numero) {
    return numero * factor;
  };
}

const duplicar = multiplicador(2);
const triplicar = multiplicador(3);
const cuadruplicar = multiplicador(4);

console.log(duplicar(5));      // 10
console.log(triplicar(5));     // 15
console.log(cuadruplicar(5));  // 20
```

---

## Casos de Uso Prácticos

### 1. Módulos y encapsulación
```javascript
const calculadora = (function() {
  // Variables privadas
  let resultado = 0;
  
  // Métodos públicos
  return {
    sumar: function(x) {
      resultado += x;
      return this;
    },
    restar: function(x) {
      resultado -= x;
      return this;
    },
    multiplicar: function(x) {
      resultado *= x;
      return this;
    },
    dividir: function(x) {
      if (x !== 0) {
        resultado /= x;
      }
      return this;
    },
    obtenerResultado: function() {
      return resultado;
    },
    resetear: function() {
      resultado = 0;
      return this;
    }
  };
})();

// Uso encadenado
calculadora
  .sumar(10)
  .multiplicar(2)
  .restar(5);

console.log(calculadora.obtenerResultado()); // 15
```

### 2. Callbacks y event listeners
```javascript
function crearBotonContador(id) {
  let clicks = 0;
  
  const boton = document.getElementById(id);
  
  boton.addEventListener('click', function() {
    clicks++;
    console.log(`Botón clickeado ${clicks} veces`);
  });
  
  return {
    obtenerClicks: function() {
      return clicks;
    },
    resetear: function() {
      clicks = 0;
    }
  };
}

const contador = crearBotonContador('miBoton');
// Cada click incrementa la variable 'clicks' privada
```

### 3. Memoización (caché de resultados)
```javascript
function memoizar(fn) {
  const cache = {};
  
  return function(...args) {
    const key = JSON.stringify(args);
    
    if (cache[key]) {
      console.log('Devolviendo desde caché');
      return cache[key];
    }
    
    console.log('Calculando resultado');
    const resultado = fn(...args);
    cache[key] = resultado;
    return resultado;
  };
}

// Función costosa
function fibonacci(n) {
  if (n <= 1) return n;
  return fibonacci(n - 1) + fibonacci(n - 2);
}

const fibonacciMemo = memoizar(fibonacci);

console.log(fibonacciMemo(10)); // Calculando resultado: 55
console.log(fibonacciMemo(10)); // Devolviendo desde caché: 55
```

### 4. Curry (funciones parcialmente aplicadas)
```javascript
function curry(fn) {
  return function curried(...args) {
    if (args.length >= fn.length) {
      return fn.apply(this, args);
    } else {
      return function(...nextArgs) {
        return curried.apply(this, args.concat(nextArgs));
      };
    }
  };
}

function sumar(a, b, c) {
  return a + b + c;
}

const sumarCurried = curry(sumar);

console.log(sumarCurried(1)(2)(3));     // 6
console.log(sumarCurried(1, 2)(3));     // 6
console.log(sumarCurried(1)(2, 3));     // 6

// Aplicación parcial
const sumar5 = sumarCurried(5);
console.log(sumar5(10, 15));            // 30
```

### 5. Temporizadores y delays
```javascript
function crearTemporizador(tiempo) {
  let tiempoRestante = tiempo;
  let intervalo = null;
  
  return {
    iniciar: function(callback) {
      intervalo = setInterval(function() {
        tiempoRestante--;
        callback(tiempoRestante);
        
        if (tiempoRestante <= 0) {
          clearInterval(intervalo);
        }
      }, 1000);
    },
    pausar: function() {
      clearInterval(intervalo);
    },
    reiniciar: function() {
      tiempoRestante = tiempo;
    }
  };
}

const temporizador = crearTemporizador(10);
temporizador.iniciar(function(tiempo) {
  console.log(`Tiempo restante: ${tiempo}s`);
});
```

### 6. Factory functions
```javascript
function crearProducto(nombre, precio) {
  let stock = 0;
  
  return {
    getNombre: () => nombre,
    getPrecio: () => precio,
    getStock: () => stock,
    agregarStock: function(cantidad) {
      stock += cantidad;
      return `Stock actualizado: ${stock}`;
    },
    vender: function(cantidad) {
      if (cantidad > stock) {
        return 'Stock insuficiente';
      }
      stock -= cantidad;
      return `Vendido ${cantidad}. Stock restante: ${stock}`;
    },
    aplicarDescuento: function(porcentaje) {
      precio = precio * (1 - porcentaje / 100);
      return `Nuevo precio: €${precio.toFixed(2)}`;
    }
  };
}

const laptop = crearProducto('Laptop', 1000);
console.log(laptop.agregarStock(10));    // 'Stock actualizado: 10'
console.log(laptop.vender(3));           // 'Vendido 3. Stock restante: 7'
console.log(laptop.aplicarDescuento(20));// 'Nuevo precio: €800.00'
```

---

## Patrones Comunes

### 1. IIFE (Immediately Invoked Function Expression)
```javascript
const modulo = (function() {
  // Variables privadas
  const privada = 'No puedes verme';
  let contador = 0;
  
  // Métodos públicos
  return {
    metodoPublico: function() {
      contador++;
      return `Llamada número ${contador}`;
    },
    obtenerPrivada: function() {
      return privada;
    }
  };
})();

console.log(modulo.metodoPublico());     // 'Llamada número 1'
console.log(modulo.obtenerPrivada());    // 'No puedes verme'
// console.log(modulo.privada);          // undefined
```

### 2. Module Pattern
```javascript
const Usuario = (function() {
  // Variables privadas compartidas
  const usuarios = [];
  let idActual = 0;
  
  // Constructor privado
  function crearUsuario(nombre, email) {
    return {
      id: ++idActual,
      nombre: nombre,
      email: email,
      activo: true
    };
  }
  
  // API pública
  return {
    agregar: function(nombre, email) {
      const usuario = crearUsuario(nombre, email);
      usuarios.push(usuario);
      return usuario;
    },
    obtenerTodos: function() {
      return [...usuarios]; // Copia para evitar mutación
    },
    buscarPorId: function(id) {
      return usuarios.find(u => u.id === id);
    },
    desactivar: function(id) {
      const usuario = this.buscarPorId(id);
      if (usuario) {
        usuario.activo = false;
      }
      return usuario;
    }
  };
})();

Usuario.agregar('Ana', 'ana@example.com');
Usuario.agregar('Carlos', 'carlos@example.com');
console.log(Usuario.obtenerTodos());
```

### 3. Revealing Module Pattern
```javascript
const Carrito = (function() {
  // Privado
  let items = [];
  let total = 0;
  
  function calcularTotal() {
    total = items.reduce((sum, item) => sum + item.precio, 0);
  }
  
  function agregarItem(nombre, precio) {
    items.push({ nombre, precio });
    calcularTotal();
  }
  
  function eliminarItem(nombre) {
    items = items.filter(item => item.nombre !== nombre);
    calcularTotal();
  }
  
  function obtenerTotal() {
    return total;
  }
  
  function obtenerItems() {
    return [...items];
  }
  
  function vaciar() {
    items = [];
    total = 0;
  }
  
  // Revelar métodos públicos
  return {
    agregar: agregarItem,
    eliminar: eliminarItem,
    getTotal: obtenerTotal,
    getItems: obtenerItems,
    vaciar: vaciar
  };
})();

Carrito.agregar('Laptop', 1000);
Carrito.agregar('Mouse', 25);
console.log(Carrito.getTotal());  // 1025
```

---

## Problemas y Soluciones

### Problema 1: Closures en bucles
```javascript
// PROBLEMA: Todas las funciones comparten la misma 'i'
for (var i = 0; i < 3; i++) {
  setTimeout(function() {
    console.log(i); // Imprime 3, 3, 3
  }, 100);
}

// SOLUCIÓN 1: Usar let (block scope)
for (let i = 0; i < 3; i++) {
  setTimeout(function() {
    console.log(i); // Imprime 0, 1, 2
  }, 100);
}

// SOLUCIÓN 2: IIFE para crear un nuevo scope
for (var i = 0; i < 3; i++) {
  (function(j) {
    setTimeout(function() {
      console.log(j); // Imprime 0, 1, 2
    }, 100);
  })(i);
}

// SOLUCIÓN 3: Usar función auxiliar
function crearCallback(indice) {
  return function() {
    console.log(indice);
  };
}

for (var i = 0; i < 3; i++) {
  setTimeout(crearCallback(i), 100); // Imprime 0, 1, 2
}
```

### Problema 2: Pérdida de memoria
```javascript
// PROBLEMA: El closure mantiene referencias innecesarias
function crearGrandes() {
  const granArray = new Array(1000000);
  
  return function() {
    // Solo necesitamos una propiedad, pero mantenemos todo el array
    return granArray.length;
  };
}

// SOLUCIÓN: Solo mantener lo necesario
function crearGrandes() {
  const granArray = new Array(1000000);
  const longitud = granArray.length;
  
  return function() {
    return longitud; // Solo mantiene un número, no el array
  };
}
```

### Problema 3: Closures y this
```javascript
// PROBLEMA: 'this' no se captura en closures tradicionales
const objeto = {
  nombre: 'Objeto',
  metodo: function() {
    setTimeout(function() {
      console.log(this.nombre); // undefined (this es window/global)
    }, 100);
  }
};

// SOLUCIÓN 1: Guardar 'this' en variable
const objeto1 = {
  nombre: 'Objeto',
  metodo: function() {
    const self = this;
    setTimeout(function() {
      console.log(self.nombre); // 'Objeto'
    }, 100);
  }
};

// SOLUCIÓN 2: Arrow function (captura this léxicamente)
const objeto2 = {
  nombre: 'Objeto',
  metodo: function() {
    setTimeout(() => {
      console.log(this.nombre); // 'Objeto'
    }, 100);
  }
};

// SOLUCIÓN 3: bind
const objeto3 = {
  nombre: 'Objeto',
  metodo: function() {
    setTimeout(function() {
      console.log(this.nombre); // 'Objeto'
    }.bind(this), 100);
  }
};
```

---

## Mejores Prácticas

### 1. Usar closures para encapsulación
```javascript
// BUENO: Variables privadas
function crearCuentaBancaria(saldoInicial) {
  let saldo = saldoInicial;
  
  return {
    depositar: (cantidad) => saldo += cantidad,
    retirar: (cantidad) => {
      if (cantidad <= saldo) {
        saldo -= cantidad;
        return true;
      }
      return false;
    },
    consultarSaldo: () => saldo
  };
}

// MALO: Variables expuestas
function CuentaBancaria(saldoInicial) {
  this.saldo = saldoInicial; // Público, puede modificarse
}
```

### 2. Evitar closures innecesarios
```javascript
// MALO: Closure innecesario
function obtenerNombre(persona) {
  return function() {
    return persona.nombre;
  };
}

// BUENO: Acceso directo
function obtenerNombre(persona) {
  return persona.nombre;
}
```

### 3. Liberar referencias cuando sea posible
```javascript
function crearManejador() {
  const elemento = document.getElementById('grande');
  const id = elemento.id;
  
  // Usar solo lo necesario
  return function() {
    console.log(id); // Solo mantiene 'id', no 'elemento'
  };
}
```

### 4. Documentar closures complejos
```javascript
/**
 * Crea un limitador de tasa que permite ejecutar una función
 * solo N veces en un período de tiempo
 * 
 * @param {Function} fn - Función a limitar
 * @param {number} max - Número máximo de ejecuciones
 * @param {number} periodo - Período en ms
 * @returns {Function} Función limitada
 */
function limitarTasa(fn, max, periodo) {
  let llamadas = [];
  
  return function(...args) {
    const ahora = Date.now();
    llamadas = llamadas.filter(tiempo => ahora - tiempo < periodo);
    
    if (llamadas.length < max) {
      llamadas.push(ahora);
      return fn.apply(this, args);
    }
    
    console.log('Límite de tasa excedido');
  };
}
```

Los closures son fundamentales en JavaScript y entenderlos bien te permite escribir código más limpio, modular y eficiente.
