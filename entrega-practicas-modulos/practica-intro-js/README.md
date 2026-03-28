# Soluciones a Ejercicios del Módulo Intro-JS (Keepcoding Bootcamp)

Este repositorio contiene las soluciones a los ejercicios propuestos en el módulo de Introducción a JavaScript del Bootcamp de Keepcoding (Edición XIX). El proyecto principal es una librería para gestionar playlists de música, pero también se incluyen otros ejercicios prácticos.

##  Proyecto Principal: Gestor de Playlists

Este proyecto es una librería modular en JavaScript para la gestión de listas de reproducción. El código se enfoca rigurosamente en la **Inmutabilidad** y la **Programación Funcional** para asegurar un estado predecible y un desarrollo robusto.

### Principios y Tecnologías

- **JavaScript (ES6+):** Utilización de características modernas del lenguaje.
- **JSDoc:** Documentación rigurosa de funciones y tipos de datos (`@typedef`, `@type`).
- **Pilares Fundamentales:**
  - **Inmutabilidad:** El estado nunca se modifica directamente. Cada operación (añadir, eliminar, ordenar) crea y devuelve una nueva copia del estado, evitando efectos secundarios.
  - **Programación Funcional:** Se prioriza el uso de funciones puras y métodos de array como `.map()`, `.filter()` .
  - **Gestión Segura de Estado:** El estado de las playlists está encapsulado dentro de un closure, exponiendo únicamente las funciones necesarias para interactuar con él.

### ¿Cómo ejecutarlo?

1.  Abre el fichero `playlist/index.html` en tu navegador.
2.  Interactúa con la interfaz para crear playlists, añadir canciones y probar las diferentes funcionalidades.

##  Otros Ejercicios

El repositorio también incluye soluciones a ejercicios más pequeños para practicar conceptos clave de JavaScript.

### Conceptos Practicados

- **Asincronía (`bugAsync.js`):**
  - Solución de un bug de asincronía utilizando `Promise` y `async/await` para manejar operaciones diferidas como una llamada a una API simulada.

- **Transformación de Arrays (`transform.js`):**
  - Uso de `.filter()` y `.flatMap()` para manipular estructuras de datos complejas sin usar bucles `for` o `while`.

- **Manipulación de Strings y Números (`3.2_exercise.js`, `3.3_exercise.js`):**
  - Se demuestra la inmutabilidad de los tipos primitivos en JavaScript. Las funciones de transformación utilizan cadenas de métodos inmutables (ej. `.split()`, `.toReversed()`, `.join()`) para generar nuevos valores sin alterar los originales.

### ¿Cómo ejecutar los ejercicios?

Para ejecutar un ejercicio específico:

1.  Abre el fichero `index.html` que se encuentra en la raíz del proyecto.
2.  Descomenta la línea `<script>` correspondiente al ejercicio que deseas probar.

    ```html
    <body>
      <h1>Soluciones a ejercicios modulo intro-js</h1>
      <!-- <script type="module" src="./Exercises/ejercicio1.js"></script> -->
      <!-- <script type="module" src="./Exercises/bug.js"></script> -->
      <!-- <script type="module" src="./Exercises/3.1_exercise.js"></script> -->
      <!-- <script type="module" src="./Exercises/3.2_exercise.js"></script> -->
      <!-- <script type="module" src="./Exercises/3.3_exercise.js"></script> -->
      <!-- <script type="module" src="./Exercises/transform.js"></script> -->
      <script type="module" src="./Exercises/bugAsync.js"></script> <!-- Ejemplo: bugAsync.js está activo -->
    </body>
    ```

3.  Abre `index.html` en tu navegador y revisa la consola de desarrollador para ver los resultados.