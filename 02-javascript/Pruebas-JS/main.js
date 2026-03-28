console.log(`bitxo`);

const pattern = [
  ['-', '-', '*', '-', '-'],
  ['-', '*', '*', '*', '-'],
  ['*', '*', '*', '*', '*']
];

for (let index = 0; index < pattern.length; index++) {
  console.log(pattern[index].join(''))
}

for (const element of pattern) {
  console.log(element.join(''))
}


const trimestresBootcamp = [
  {
    trimestre: 1,
    modulos: [
      { nombre: 'HTML/CSS', inicio: '2025-09-01' },
      { nombre: 'JavaScript', inicio: '2025-09-25' }
    ]
  },
  {
    trimestre: 2,
    modulos: [
      { nombre: 'React', inicio: '2025-11-05' },
      { nombre: 'Node.js', inicio: '2026-01-10' }
    ]
  },
  {
    trimestre: 3,
    modulos: [
      { nombre: 'Bases de Datos', inicio: '2026-03-01' }
    ]
  }
];

const numModulos = trimestresBootcamp.reduce((acum, trimestreActual) => {
  const clave = trimestreActual.trimestre;
  const valor = trimestreActual.modulos.length;
  acum[clave] = valor
  return acum

},{});
console.log(numModulos);

const todosLosModulos = [
    { nombre: 'HTML/CSS', inicio: '2025-09-01' },
    { nombre: 'JavaScript', inicio: '2025-09-25' },
    { nombre: 'React', inicio: '2025-11-05' },
    { nombre: 'Node.js', inicio: '2026-01-10' },
];

const arrayJs = todosLosModulos.filter(modulo => {
  return modulo.nombre.includes('JavaScript');
});
if(arrayJs.length > 0){
  console.log(`Resultado `, arrayJs)
}else{
  console.log('??????????????????????')
}

const tareasModulo = [
    { nombre: 'Leer Docs React', dificultad: 4, tiempo: 2 },
    { nombre: 'Implementar Componente', dificultad: 9, tiempo: 5 },
    { nombre: 'Corregir Bug de CORS', dificultad: 8, tiempo: 4 },
    { nombre: 'Escribir CSS básico', dificultad: 3, tiempo: 1 },
    { nombre: 'Optimizar BBDD', dificultad: 10, tiempo: 6 },
];

const arrayTareas = tareasModulo.filter( valor => {
  return valor.dificultad > 7
});

if(arrayTareas.length > 0){
  console.log('Nos quedan estas tareas :', arrayTareas)
}else{
  console.log('no hay nada mas')
};

const moduloOriginal = {
    nombre: 'JavaScript',
    estado: 'en curso',
    tareas: 4,
    calificacion: null
};

const moduloCompletado = structuredClone(moduloOriginal)
moduloCompletado.estado = 'completado';
moduloCompletado.calificacion = 0.95;

console.log(moduloOriginal)
console.log(moduloCompletado);