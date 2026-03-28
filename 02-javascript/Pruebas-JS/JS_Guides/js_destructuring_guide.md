# Guía Completa de Destructuring en JavaScript

## Tabla de Contenidos
- [Introducción al Destructuring](#introducción-al-destructuring)
- [Destructuring de Arrays](#destructuring-de-arrays)
- [Destructuring de Objetos](#destructuring-de-objetos)
- [Destructuring Anidado](#destructuring-anidado)
- [Parámetros de Función](#parámetros-de-función)
- [Casos de Uso Prácticos](#casos-de-uso-prácticos)
- [Patrones Avanzados](#patrones-avanzados)

---

## Introducción al Destructuring

El destructuring es una sintaxis que permite extraer valores de arrays u objetos y asignarlos a variables de forma concisa.

### Antes del destructuring (ES5)
```javascript
// Con objetos
const persona = { nombre: 'Ana', edad: 25 };
const nombre = persona.nombre;
const edad = persona.edad;

// Con arrays
const numeros = [1, 2, 3];
const primero = numeros[0];
const segundo = numeros[1];
```

### Con destructuring (ES6+)
```javascript
// Con objetos
const persona = { nombre: 'Ana', edad: 25 };
const { nombre, edad } = persona;

// Con arrays
const numeros = [1, 2, 3];
const [primero, segundo] = numeros;
```

---

## Destructuring de Arrays

### Básico
```javascript
const colores = ['rojo', 'verde', 'azul'];
const [primero, segundo, tercero] = colores;

console.log(primero);  // 'rojo'
console.log(segundo);  // 'verde'
console.log(tercero);  // 'azul'
```

### Omitir elementos
```javascript
const numeros = [1, 2, 3, 4, 5];

// Saltar elementos con comas
const [primero, , tercero] = numeros;
console.log(primero);  // 1
console.log(tercero);  // 3

// Obtener solo primero y último
const [inicio, , , , final] = numeros;
console.log(inicio);  // 1
console.log(final);   // 5
```

### Valores por defecto
```javascript
const colores = ['rojo'];

const [primero, segundo = 'verde', tercero = 'azul'] = colores;
console.log(primero);  // 'rojo'
console.log(segundo);  // 'verde' (valor por defecto)
console.log(tercero);  // 'azul' (valor por defecto)

// Con undefined
const [a, b = 10] = [5, undefined];
console.log(a);  // 5
console.log(b);  // 10 (undefined usa el valor por defecto)

// Con null
const [c, d = 10] = [5, null];
console.log(c);  // 5
console.log(d);  // null (null NO usa el valor por defecto)
```

### Rest operator
```javascript
const numeros = [1, 2, 3, 4, 5];

const [primero, segundo, ...resto] = numeros;
console.log(primero);  // 1
console.log(segundo);  // 2
console.log(resto);    // [3, 4, 5]

// Obtener todos excepto el primero
const [, ...sinPrimero] = numeros;
console.log(sinPrimero);  // [2, 3, 4, 5]
```

### Intercambio de variables
```javascript
let a = 1;
let b = 2;

// Intercambio sin variable temporal
[a, b] = [b, a];
console.log(a);  // 2
console.log(b);  // 1

// Rotar tres variables
let x = 1, y = 2, z = 3;
[x, y, z] = [z, x, y];
console.log(x, y, z);  // 3, 1, 2
```

### Destructuring desde funciones
```javascript
function obtenerCoordenadas() {
  return [40.7128, -74.0060];
}

const [latitud, longitud] = obtenerCoordenadas();
console.log(latitud);   // 40.7128
console.log(longitud);  // -74.0060
```

### Con String.split()
```javascript
const fecha = '2025-01-15';
const [año, mes, dia] = fecha.split('-');

console.log(año);  // '2025'
console.log(mes);  // '01'
console.log(dia);  // '15'

// Con nombre completo
const nombreCompleto = 'Ana María García López';
const [nombre, ...apellidos] = nombreCompleto.split(' ');

console.log(nombre);     // 'Ana'
console.log(apellidos);  // ['María', 'García', 'López']
```

---

## Destructuring de Objetos

### Básico
```javascript
const persona = {
  nombre: 'Ana',
  edad: 25,
  ciudad: 'Madrid'
};

const { nombre, edad, ciudad } = persona;
console.log(nombre);  // 'Ana'
console.log(edad);    // 25
console.log(ciudad);  // 'Madrid'
```

### Renombrar variables
```javascript
const persona = {
  nombre: 'Ana',
  edad: 25
};

// Renombrar al destructurar
const { nombre: nombrePersona, edad: años } = persona;
console.log(nombrePersona);  // 'Ana'
console.log(años);           // 25

// Útil para evitar conflictos
const usuario1 = { id: 1, nombre: 'Ana' };
const usuario2 = { id: 2, nombre: 'Carlos' };

const { nombre: nombre1 } = usuario1;
const { nombre: nombre2 } = usuario2;
console.log(nombre1);  // 'Ana'
console.log(nombre2);  // 'Carlos'
```

### Valores por defecto
```javascript
const persona = {
  nombre: 'Ana',
  edad: 25
};

const { nombre, edad, ciudad = 'Madrid', pais = 'España' } = persona;
console.log(nombre);  // 'Ana'
console.log(ciudad);  // 'Madrid' (valor por defecto)
console.log(pais);    // 'España' (valor por defecto)

// Con renombre y valor por defecto
const { nombre: n, profesion: p = 'Desarrolladora' } = persona;
console.log(n);  // 'Ana'
console.log(p);  // 'Desarrolladora'
```

### Rest operator con objetos
```javascript
const persona = {
  nombre: 'Ana',
  edad: 25,
  ciudad: 'Madrid',
  profesion: 'Desarrolladora'
};

const { nombre, edad, ...resto } = persona;
console.log(nombre);  // 'Ana'
console.log(edad);    // 25
console.log(resto);   // { ciudad: 'Madrid', profesion: 'Desarrolladora' }

// Excluir propiedades sensibles
const usuario = {
  id: 1,
  nombre: 'Ana',
  email: 'ana@example.com',
  password: 'secreto123'
};

const { password, ...usuarioSeguro } = usuario;
console.log(usuarioSeguro);
// { id: 1, nombre: 'Ana', email: 'ana@example.com' }
```

### Propiedades calculadas
```javascript
const propiedad = 'nombre';
const persona = {
  nombre: 'Ana',
  edad: 25
};

const { [propiedad]: valor } = persona;
console.log(valor);  // 'Ana'

// Ejemplo práctico
function obtenerPropiedad(obj, prop) {
  const { [prop]: resultado } = obj;
  return resultado;
}

console.log(obtenerPropiedad(persona, 'edad'));  // 25
```

---

## Destructuring Anidado

### Arrays anidados
```javascript
const datos = [1, 2, [3, 4, 5]];

const [a, b, [c, d, e]] = datos;
console.log(a);  // 1
console.log(b);  // 2
console.log(c);  // 3
console.log(d);  // 4
console.log(e);  // 5

// Con valores por defecto
const numeros = [1, [2]];
const [x, [y, z = 10]] = numeros;
console.log(x);  // 1
console.log(y);  // 2
console.log(z);  // 10
```

### Objetos anidados
```javascript
const persona = {
  nombre: 'Ana',
  edad: 25,
  direccion: {
    ciudad: 'Madrid',
    pais: 'España',
    coordenadas: {
      lat: 40.7128,
      lon: -74.0060
    }
  }
};

const {
  nombre,
  direccion: {
    ciudad,
    pais,
    coordenadas: { lat, lon }
  }
} = persona;

console.log(nombre);  // 'Ana'
console.log(ciudad);  // 'Madrid'
console.log(lat);     // 40.7128
console.log(lon);     // -74.0060

// Nota: 'direccion' y 'coordenadas' NO están disponibles
// console.log(direccion); // ReferenceError
```

### Renombrar en estructuras anidadas
```javascript
const usuario = {
  id: 1,
  perfil: {
    nombre: 'Ana',
    edad: 25
  }
};

const {
  perfil: {
    nombre: nombreUsuario,
    edad: edadUsuario
  }
} = usuario;

console.log(nombreUsuario);  // 'Ana'
console.log(edadUsuario);    // 25
```

### Valores por defecto en anidados
```javascript
const config = {
  tema: 'oscuro',
  opciones: {
    idioma: 'es'
  }
};

const {
  tema,
  opciones: {
    idioma,
    fuente = 'Arial',
    tamaño = 14
  } = {}  // Valor por defecto para opciones
} = config;

console.log(tema);     // 'oscuro'
console.log(idioma);   // 'es'
console.log(fuente);   // 'Arial'
console.log(tamaño);   // 14
```

### Mixto: Arrays y objetos
```javascript
const datos = {
  nombre: 'Ana',
  hobbies: ['leer', 'correr', 'programar'],
  trabajo: {
    empresa: 'Tech Corp',
    años: [2020, 2021, 2022]
  }
};

const {
  nombre,
  hobbies: [hobby1, hobby2],
  trabajo: {
    empresa,
    años: [añoInicio, , añoActual]
  }
} = datos;

console.log(nombre);      // 'Ana'
console.log(hobby1);      // 'leer'
console.log(hobby2);      // 'correr'
console.log(empresa);     // 'Tech Corp'
console.log(añoInicio);   // 2020
console.log(añoActual);   // 2022
```

---

## Parámetros de Función

### Destructuring en parámetros de arrays
```javascript
function sumarPrimerosDos([a, b]) {
  return a + b;
}

console.log(sumarPrimerosDos([5, 10, 15]));  // 15

// Con valores por defecto
function crearPunto([x = 0, y = 0] = []) {
  return { x, y };
}

console.log(crearPunto([5, 10]));  // { x: 5, y: 10 }
console.log(crearPunto([5]));      // { x: 5, y: 0 }
console.log(crearPunto());         // { x: 0, y: 0 }
```

### Destructuring en parámetros de objetos
```javascript
function saludar({ nombre, edad }) {
  return `Hola, soy ${nombre} y tengo ${edad} años`;
}

const persona = { nombre: 'Ana', edad: 25, ciudad: 'Madrid' };
console.log(saludar(persona));
// 'Hola, soy Ana y tengo 25 años'

// Con valores por defecto
function crearUsuario({ nombre, edad = 18, rol = 'usuario' } = {}) {
  return { nombre, edad, rol };
}

console.log(crearUsuario({ nombre: 'Ana', edad: 25 }));
// { nombre: 'Ana', edad: 25, rol: 'usuario' }

console.log(crearUsuario({ nombre: 'Carlos' }));
// { nombre: 'Carlos', edad: 18, rol: 'usuario' }

console.log(crearUsuario());
// { nombre: undefined, edad: 18, rol: 'usuario' }
```

### Renombrar en parámetros
```javascript
function procesarPedido({ id: idPedido, total: precio }) {
  console.log(`Pedido ${idPedido}: €${precio}`);
}

procesarPedido({ id: 123, total: 99.99 });
// 'Pedido 123: €99.99'
```

### Rest en parámetros
```javascript
function registrarEvento({ tipo, timestamp, ...detalles }) {
  console.log(`[${timestamp}] Evento: ${tipo}`);
  console.log('Detalles:', detalles);
}

registrarEvento({
  tipo: 'click',
  timestamp: '2025-01-15',
  elemento: 'button',
  posicion: { x: 100, y: 200 }
});
// [2025-01-15] Evento: click
// Detalles: { elemento: 'button', posicion: { x: 100, y: 200 } }
```

---

## Casos de Uso Prácticos

### API Responses
```javascript
// Respuesta de API
const respuesta = {
  status: 200,
  data: {
    usuario: {
      id: 1,
      nombre: 'Ana',
      email: 'ana@example.com'
    },
    token: 'abc123'
  },
  meta: {
    timestamp: '2025-01-15'
  }
};

// Extraer solo lo necesario
const {
  status,
  data: {
    usuario: { nombre, email },
    token
  }
} = respuesta;

console.log(status);  // 200
console.log(nombre);  // 'Ana'
console.log(email);   // 'ana@example.com'
console.log(token);   // 'abc123'
```

### Configuración de opciones
```javascript
function crearServidor({
  puerto = 3000,
  host = 'localhost',
  ssl = false,
  opciones = {}
} = {}) {
  return {
    url: `${ssl ? 'https' : 'http'}://${host}:${puerto}`,
    ...opciones
  };
}

// Uso
console.log(crearServidor());
// { url: 'http://localhost:3000' }

console.log(crearServidor({ puerto: 8080, ssl: true }));
// { url: 'https://localhost:8080' }

console.log(crearServidor({
  puerto: 8080,
  opciones: { timeout: 5000, maxConnections: 100 }
}));
// { url: 'http://localhost:8080', timeout: 5000, maxConnections: 100 }
```

### Manejo de errores
```javascript
async function obtenerUsuario(id) {
  try {
    const respuesta = await fetch(`/api/usuarios/${id}`);
    const { data, error } = await respuesta.json();
    
    if (error) {
      const { mensaje, codigo } = error;
      throw new Error(`Error ${codigo}: ${mensaje}`);
    }
    
    return data;
  } catch (error) {
    console.error('Error:', error.message);
    return null;
  }
}
```

### Hooks de React
```javascript
// useState
const [count, setCount] = useState(0);
const [user, setUser] = useState(null);

// useEffect con cleanup
useEffect(() => {
  return () => {
    // cleanup
  };
}, []);

// Custom hook
function useUsuario(id) {
  const [usuario, setUsuario] = useState(null);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);
  
  // ...
  
  return { usuario, cargando, error };
}

// Uso
const { usuario, cargando, error } = useUsuario(123);
```

### Procesamiento de listas
```javascript
const usuarios = [
  { id: 1, nombre: 'Ana', edad: 25, activo: true },
  { id: 2, nombre: 'Carlos', edad: 30, activo: false },
  { id: 3, nombre: 'Beatriz', edad: 28, activo: true }
];

// Extraer propiedades específicas
const nombresActivos = usuarios
  .filter(({ activo }) => activo)
  .map(({ nombre }) => nombre);

console.log(nombresActivos);  // ['Ana', 'Beatriz']

// Transformar datos
const resumen = usuarios.map(({ nombre, edad }) => ({
  nombre,
  categoría: edad >= 30 ? 'senior' : 'junior'
}));

console.log(resumen);
// [
//   { nombre: 'Ana', categoría: 'junior' },
//   { nombre: 'Carlos', categoría: 'senior' },
//   { nombre: 'Beatriz', categoría: 'junior' }
// ]
```

### Importaciones de módulos
```javascript
// Named imports (destructuring)
import { useState, useEffect, useMemo } from 'react';
import { formatDate, parseDate } from './utils';

// Con renombre
import { default as React, Component as ReactComponent } from 'react';

// Export con destructuring
export const { PI, E } = Math;
```

---

## Patrones Avanzados

### Destructuring en bucles
```javascript
const usuarios = [
  { id: 1, nombre: 'Ana', edad: 25 },
  { id: 2, nombre: 'Carlos', edad: 30 }
];

// for...of con destructuring
for (const { nombre, edad } of usuarios) {
  console.log(`${nombre} tiene ${edad} años`);
}

// forEach con destructuring
usuarios.forEach(({ nombre }) => {
  console.log(nombre);
});

// Object.entries con destructuring
const config = { puerto: 3000, host: 'localhost' };
for (const [clave, valor] of Object.entries(config)) {
  console.log(`${clave}: ${valor}`);
}
```

### Encadenamiento con destructuring
```javascript
const respuesta = {
  data: {
    usuario: {
      perfil: {
        nombre: 'Ana'
      }
    }
  }
};

// Destructuring profundo con valores por defecto
const {
  data: {
    usuario: {
      perfil: {
        nombre = 'Desconocido'
      } = {}
    } = {}
  } = {}
} = respuesta;

console.log(nombre);  // 'Ana'

// Si algún nivel es undefined/null, usa el valor por defecto
const respuestaVacia = {};
const {
  data: {
    usuario: {
      perfil: {
        nombre: nombreVacio = 'Desconocido'
      } = {}
    } = {}
  } = {}
} = respuestaVacia;

console.log(nombreVacio);  // 'Desconocido'
```

### Destructuring condicional
```javascript
function procesarDatos(datos) {
  if (!datos) return null;
  
  const { tipo } = datos;
  
  switch (tipo) {
    case 'usuario':
      const { nombre, email } = datos;
      return { nombre, email };
      
    case 'producto':
      const { titulo, precio } = datos;
      return { titulo, precio };
      
    default:
      return datos;
  }
}
```

### Combinar spread y destructuring
```javascript
const original = {
  id: 1,
  nombre: 'Ana',
  edad: 25,
  ciudad: 'Madrid'
};

// Actualizar propiedades
const { id, ...resto } = original;
const actualizado = {
  ...resto,
  edad: 26,
  pais: 'España'
};

console.log(actualizado);
// { nombre: 'Ana', edad: 26, ciudad: 'Madrid', pais: 'España' }

// Merge de objetos con precedencia
const defaults = { tema: 'claro', idioma: 'es' };
const userConfig = { tema: 'oscuro' };

const config = { ...defaults, ...userConfig };
console.log(config);  // { tema: 'oscuro', idioma: 'es' }
```

### Destructuring con expresiones regulares
```javascript
const email = 'usuario@ejemplo.com';
const regex = /(\w+)@(\w+)\.(\w+)/;
const [, usuario, dominio, extension] = email.match(regex) || [];

console.log(usuario);    // 'usuario'
console.log(dominio);    // 'ejemplo'
console.log(extension);  // 'com'
```

### Validación y extracción simultánea
```javascript
function procesarPedido(pedido) {
  // Destructuring con validación
  const {
    id,
    productos = [],
    cliente = {},
    total
  } = pedido || {};
  
  if (!id || !total || productos.length === 0) {
    throw new Error('Pedido inválido');
  }
  
  const { nombre: nombreCliente, email: emailCliente } = cliente;
  
  return {
    idPedido: id,
    cantidadProductos: productos.length,
    cliente: nombreCliente,
    email: emailCliente,
    total
  };
}
```

El destructuring es una herramienta poderosa que hace el código más legible y conciso. Es especialmente útil en aplicaciones modernas que trabajan con APIs, frameworks como React, y procesamiento de datos complejos.