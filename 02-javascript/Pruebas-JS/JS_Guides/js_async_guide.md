# Guía Completa de Asincronía en JavaScript

## Tabla de Contenidos
- [Introducción a la Asincronía](#introducción-a-la-asincronía)
- [Event Loop](#event-loop)
- [Callbacks](#callbacks)
- [Promises](#promises)
- [Async/Await](#asyncawait)
- [Temporizadores](#temporizadores)
- [Manejo de Errores](#manejo-de-errores)
- [Patrones Avanzados](#patrones-avanzados)

---

## Introducción a la Asincronía

### JavaScript es Single-Threaded
JavaScript ejecuta el código en un solo hilo, pero puede manejar operaciones asíncronas mediante el Event Loop.

```javascript
// Código síncrono
console.log('1');
console.log('2');
console.log('3');
// Output: 1, 2, 3

// Código asíncrono
console.log('1');
setTimeout(() => console.log('2'), 0);
console.log('3');
// Output: 1, 3, 2
```

### ¿Por qué asincronía?
- Operaciones de red (fetch, APIs)
- Lectura/escritura de archivos
- Consultas a bases de datos
- Temporizadores
- Eventos del usuario

---

## Event Loop

### Cómo funciona
El Event Loop es el mecanismo que permite a JavaScript realizar operaciones asíncronas.

```javascript
// Stack de llamadas
function primera() {
  console.log('Primera función');
  segunda();
}

function segunda() {
  console.log('Segunda función');
}

primera();
// Output:
// Primera función
// Segunda función
```

### Call Stack, Web APIs, Callback Queue
```javascript
console.log('Inicio');

setTimeout(() => {
  console.log('Timeout');
}, 0);

Promise.resolve().then(() => {
  console.log('Promise');
});

console.log('Fin');

// Output:
// Inicio
// Fin
// Promise
// Timeout
```

**Explicación:**
1. `console.log('Inicio')` - Stack
2. `setTimeout` - Web API (va a Task Queue)
3. `Promise` - Microtask Queue (prioridad)
4. `console.log('Fin')` - Stack
5. Microtask Queue se vacía primero
6. Luego Task Queue

### Microtasks vs Macrotasks
```javascript
// Macrotasks (Task Queue)
setTimeout(() => console.log('Timeout'), 0);
setInterval(() => console.log('Interval'), 100);

// Microtasks (Microtask Queue)
Promise.resolve().then(() => console.log('Promise'));
queueMicrotask(() => console.log('Microtask'));

// Microtasks tienen prioridad sobre Macrotasks
```

---

## Callbacks

### Callbacks básicos
```javascript
function procesar(datos, callback) {
  console.log('Procesando...');
  setTimeout(() => {
    const resultado = datos * 2;
    callback(resultado);
  }, 1000);
}

procesar(5, (resultado) => {
  console.log('Resultado:', resultado);
});
// Output (después de 1s):
// Procesando...
// Resultado: 10
```

### Callbacks con errores
```javascript
function leerArchivo(nombre, callback) {
  setTimeout(() => {
    if (nombre === 'error.txt') {
      callback(new Error('Archivo no encontrado'), null);
    } else {
      callback(null, 'Contenido del archivo');
    }
  }, 1000);
}

// Patrón error-first callback
leerArchivo('datos.txt', (error, datos) => {
  if (error) {
    console.error('Error:', error.message);
    return;
  }
  console.log('Datos:', datos);
});
```

### Callback Hell (Pirámide de la perdición)
```javascript
// PROBLEMA: Código difícil de leer y mantener
obtenerUsuario(userId, (errorUsuario, usuario) => {
  if (errorUsuario) return console.error(errorUsuario);
  
  obtenerPedidos(usuario.id, (errorPedidos, pedidos) => {
    if (errorPedidos) return console.error(errorPedidos);
    
    obtenerDetalles(pedidos[0].id, (errorDetalles, detalles) => {
      if (errorDetalles) return console.error(errorDetalles);
      
      console.log(detalles);
    });
  });
});
```

---

## Promises

### Creación de Promises
```javascript
const promesa = new Promise((resolve, reject) => {
  const exito = true;
  
  setTimeout(() => {
    if (exito) {
      resolve('Operación exitosa');
    } else {
      reject('Operación fallida');
    }
  }, 1000);
});

// Consumir la promise
promesa
  .then(resultado => console.log(resultado))
  .catch(error => console.error(error));
```

### Estados de una Promise
```javascript
// Pending (pendiente)
const promesaPendiente = new Promise((resolve) => {
  setTimeout(() => resolve('Resuelto'), 1000);
});

// Fulfilled (cumplida)
const promesaCumplida = Promise.resolve('Valor');

// Rejected (rechazada)
const promesaRechazada = Promise.reject('Error');
```

### Encadenamiento de Promises
```javascript
function obtenerUsuario(id) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ id, nombre: 'Ana' });
    }, 1000);
  });
}

function obtenerPedidos(usuarioId) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([{ id: 1, producto: 'Laptop' }]);
    }, 1000);
  });
}

// Encadenamiento
obtenerUsuario(1)
  .then(usuario => {
    console.log('Usuario:', usuario);
    return obtenerPedidos(usuario.id);
  })
  .then(pedidos => {
    console.log('Pedidos:', pedidos);
  })
  .catch(error => {
    console.error('Error:', error);
  })
  .finally(() => {
    console.log('Proceso completado');
  });
```

### Promise.all()
Espera a que todas las promises se resuelvan.

```javascript
const promesa1 = Promise.resolve(1);
const promesa2 = Promise.resolve(2);
const promesa3 = Promise.resolve(3);

Promise.all([promesa1, promesa2, promesa3])
  .then(resultados => {
    console.log(resultados); // [1, 2, 3]
  })
  .catch(error => {
    console.error('Una falló:', error);
  });

// Si una falla, todas fallan
Promise.all([
  Promise.resolve(1),
  Promise.reject('Error'),
  Promise.resolve(3)
])
  .then(resultados => console.log(resultados))
  .catch(error => console.error(error)); // 'Error'
```

### Promise.allSettled()
Espera a que todas las promises terminen (resueltas o rechazadas).

```javascript
Promise.allSettled([
  Promise.resolve(1),
  Promise.reject('Error'),
  Promise.resolve(3)
])
  .then(resultados => {
    console.log(resultados);
    /*
    [
      { status: 'fulfilled', value: 1 },
      { status: 'rejected', reason: 'Error' },
      { status: 'fulfilled', value: 3 }
    ]
    */
  });
```

### Promise.race()
Resuelve/rechaza con la primera promise que termine.

```javascript
const promesa1 = new Promise(resolve => setTimeout(() => resolve('Lenta'), 2000));
const promesa2 = new Promise(resolve => setTimeout(() => resolve('Rápida'), 1000));

Promise.race([promesa1, promesa2])
  .then(resultado => {
    console.log(resultado); // 'Rápida'
  });
```

### Promise.any()
Resuelve con la primera promise exitosa.

```javascript
Promise.any([
  Promise.reject('Error 1'),
  Promise.resolve('Éxito'),
  Promise.reject('Error 2')
])
  .then(resultado => {
    console.log(resultado); // 'Éxito'
  });

// Si todas fallan
Promise.any([
  Promise.reject('Error 1'),
  Promise.reject('Error 2')
])
  .catch(error => {
    console.error(error); // AggregateError
  });
```

---

## Async/Await

### Sintaxis básica
```javascript
async function obtenerDatos() {
  return 'Datos';
}

// Una función async siempre retorna una Promise
obtenerDatos().then(datos => console.log(datos)); // 'Datos'
```

### Await
```javascript
function esperar(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function ejecutar() {
  console.log('Inicio');
  
  await esperar(2000);
  console.log('Después de 2 segundos');
  
  await esperar(1000);
  console.log('Después de 3 segundos');
}

ejecutar();
```

### Reescribir Promises con Async/Await
```javascript
// Con Promises
function obtenerUsuarioPedidos(id) {
  return obtenerUsuario(id)
    .then(usuario => {
      console.log('Usuario:', usuario);
      return obtenerPedidos(usuario.id);
    })
    .then(pedidos => {
      console.log('Pedidos:', pedidos);
      return pedidos;
    });
}

// Con Async/Await (más legible)
async function obtenerUsuarioPedidos(id) {
  const usuario = await obtenerUsuario(id);
  console.log('Usuario:', usuario);
  
  const pedidos = await obtenerPedidos(usuario.id);
  console.log('Pedidos:', pedidos);
  
  return pedidos;
}
```

### Try/Catch con Async/Await
```javascript
async function obtenerDatos() {
  try {
    const respuesta = await fetch('https://api.ejemplo.com/datos');
    
    if (!respuesta.ok) {
      throw new Error(`HTTP error: ${respuesta.status}`);
    }
    
    const datos = await respuesta.json();
    return datos;
    
  } catch (error) {
    console.error('Error al obtener datos:', error.message);
    throw error;
  }
}
```

### Múltiples awaits en paralelo
```javascript
// MAL: Secuencial (lento)
async function obtenerTodoSecuencial() {
  const usuarios = await obtenerUsuarios(); // 1s
  const productos = await obtenerProductos(); // 1s
  const pedidos = await obtenerPedidos(); // 1s
  return { usuarios, productos, pedidos }; // Total: 3s
}

// BIEN: Paralelo (rápido)
async function obtenerTodoParalelo() {
  const [usuarios, productos, pedidos] = await Promise.all([
    obtenerUsuarios(),
    obtenerProductos(),
    obtenerPedidos()
  ]);
  return { usuarios, productos, pedidos }; // Total: 1s
}
```

### Await en bucles
```javascript
const ids = [1, 2, 3, 4, 5];

// Secuencial (uno tras otro)
async function procesoSecuencial() {
  const resultados = [];
  
  for (const id of ids) {
    const dato = await obtenerDato(id);
    resultados.push(dato);
  }
  
  return resultados;
}

// Paralelo (todos a la vez)
async function procesoParalelo() {
  const promesas = ids.map(id => obtenerDato(id));
  const resultados = await Promise.all(promesas);
  return resultados;
}
```

---

## Temporizadores

### setTimeout()
```javascript
// Sintaxis básica
const timerId = setTimeout(() => {
  console.log('Ejecutado después de 2 segundos');
}, 2000);

// Con parámetros
setTimeout((nombre, edad) => {
  console.log(`${nombre} tiene ${edad} años`);
}, 1000, 'Ana', 25);

// Cancelar timeout
clearTimeout(timerId);
```

### setInterval()
```javascript
let contador = 0;

const intervalId = setInterval(() => {
  contador++;
  console.log(`Contador: ${contador}`);
  
  if (contador === 5) {
    clearInterval(intervalId);
    console.log('Detenido');
  }
}, 1000);
```

### Problemas con setInterval
```javascript
// PROBLEMA: Si la función tarda más que el intervalo
let ejecutando = false;

setInterval(() => {
  if (ejecutando) {
    console.log('Aún ejecutando la anterior');
    return;
  }
  
  ejecutando = true;
  
  // Operación que puede tardar
  setTimeout(() => {
    ejecutando = false;
  }, 2000);
}, 1000);

// SOLUCIÓN: Usar setTimeout recursivo
function ejecutarPeriodicamente() {
  // Hacer algo
  console.log('Ejecutando');
  
  setTimeout(ejecutarPeriodicamente, 1000);
}

ejecutarPeriodicamente();
```

### Promisificar setTimeout
```javascript
function esperar(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

// Uso con async/await
async function demo() {
  console.log('Inicio');
  await esperar(2000);
  console.log('Después de 2 segundos');
}
```

---

## Manejo de Errores

### Try/Catch con Async/Await
```javascript
async function obtenerUsuario(id) {
  try {
    const respuesta = await fetch(`/api/usuarios/${id}`);
    
    if (!respuesta.ok) {
      throw new Error(`Usuario no encontrado: ${id}`);
    }
    
    const usuario = await respuesta.json();
    return usuario;
    
  } catch (error) {
    console.error('Error:', error.message);
    return null;
  }
}
```

### Catch en Promises
```javascript
fetch('/api/datos')
  .then(respuesta => respuesta.json())
  .then(datos => {
    console.log(datos);
  })
  .catch(error => {
    console.error('Error:', error);
  })
  .finally(() => {
    console.log('Proceso terminado');
  });
```

### Errores no capturados
```javascript
// Capturar errores globales de Promises
window.addEventListener('unhandledrejection', (event) => {
  console.error('Promise rechazada no manejada:', event.reason);
  event.preventDefault();
});

// Promise sin catch
Promise.reject('Error sin manejar'); // Se captura arriba
```

### Reintentos automáticos
```javascript
async function obtenerConReintentos(url, intentosMax = 3) {
  for (let intento = 1; intento <= intentosMax; intento++) {
    try {
      const respuesta = await fetch(url);
      
      if (respuesta.ok) {
        return await respuesta.json();
      }
      
      throw new Error(`HTTP ${respuesta.status}`);
      
    } catch (error) {
      console.log(`Intento ${intento} fallido:`, error.message);
      
      if (intento === intentosMax) {
        throw error;
      }
      
      // Esperar antes de reintentar
      await new Promise(resolve => setTimeout(resolve, 1000 * intento));
    }
  }
}
```

---

## Patrones Avanzados

### Debounce (Async)
```javascript
function debounce(fn, delay) {
  let timeoutId;
  
  return function(...args) {
    clearTimeout(timeoutId);
    
    return new Promise((resolve) => {
      timeoutId = setTimeout(async () => {
        const resultado = await fn.apply(this, args);
        resolve(resultado);
      }, delay);
    });
  };
}

// Uso
const buscarDebounced = debounce(async (termino) => {
  const respuesta = await fetch(`/api/buscar?q=${termino}`);
  return await respuesta.json();
}, 500);

// Solo hace la búsqueda 500ms después del último cambio
input.addEventListener('input', async (e) => {
  const resultados = await buscarDebounced(e.target.value);
  console.log(resultados);
});
```

### Throttle (Async)
```javascript
function throttle(fn, limit) {
  let esperando = false;
  
  return async function(...args) {
    if (esperando) return;
    
    esperando = true;
    
    const resultado = await fn.apply(this, args);
    
    setTimeout(() => {
      esperando = false;
    }, limit);
    
    return resultado;
  };
}
```

### Queue (Cola de ejecución)
```javascript
class AsyncQueue {
  constructor() {
    this.queue = [];
    this.ejecutando = false;
  }
  
  async agregar(fn) {
    this.queue.push(fn);
    
    if (!this.ejecutando) {
      await this.ejecutar();
    }
  }
  
  async ejecutar() {
    this.ejecutando = true;
    
    while (this.queue.length > 0) {
      const fn = this.queue.shift();
      try {
        await fn();
      } catch (error) {
        console.error('Error en cola:', error);
      }
    }
    
    this.ejecutando = false;
  }
}

// Uso
const cola = new AsyncQueue();

cola.agregar(async () => {
  await esperar(1000);
  console.log('Tarea 1');
});

cola.agregar(async () => {
  await esperar(500);
  console.log('Tarea 2');
});
```

### Limitar concurrencia
```javascript
async function limitarConcurrencia(tareas, limite) {
  const resultados = [];
  const ejecutando = [];
  
  for (const tarea of tareas) {
    const promesa = tarea().then(resultado => {
      ejecutando.splice(ejecutando.indexOf(promesa), 1);
      return resultado;
    });
    
    resultados.push(promesa);
    ejecutando.push(promesa);
    
    if (ejecutando.length >= limite) {
      await Promise.race(ejecutando);
    }
  }
  
  return await Promise.all(resultados);
}

// Uso
const tareas = Array.from({ length: 10 }, (_, i) => 
  () => fetch(`/api/datos/${i}`).then(r => r.json())
);

// Solo 3 requests simultáneos
const resultados = await limitarConcurrencia(tareas, 3);
```

### Timeout para Promises
```javascript
function conTimeout(promesa, ms) {
  return Promise.race([
    promesa,
    new Promise((_, reject) => 
      setTimeout(() => reject(new Error('Timeout')), ms)
    )
  ]);
}

// Uso
try {
  const datos = await conTimeout(
    fetch('https://api-lenta.com/datos'),
    5000
  );
  console.log(datos);
} catch (error) {
  console.error('Timeout o error:', error.message);
}
```

La asincronía es fundamental en JavaScript moderno. Dominar Promises y Async/Await te permite escribir código más limpio y mantenible.