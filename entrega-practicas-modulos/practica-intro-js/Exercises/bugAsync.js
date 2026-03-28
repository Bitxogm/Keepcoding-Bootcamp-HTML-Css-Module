/*Ejercicio 5 Arreglar bug de asincronía
Tenemos otro error que nuestro cliente nos pide arreglar. El cliente está pidiendo un usuario
y nos dice que está usando el id correcto el 1. Pero que siempre le da undefined. Nos ha
pasado el código que tenemos que revisar y arreglar. Para este problema crear un archivo
llamado bugAsync.js con la solución.
*/

// Este programa simula una llamada asincrónica para obtener un usuario
// function obtenerUsuario(id) {
// let usuario;
// setTimeout(() => {
// if (id === 1) {
// usuario = { id: 1, nombre: 'John Doe' };
// }
// }, 2000);
// }
// return usuario;
// const usuario = obtenerUsuario(1);
// console.log(usuario);


const users = [
  { id: 1, name: 'John Doe' },
  { id: 2, name: 'Mary Smith' },
  { id: 3, name: 'Peter Parker' }
];

const getUserById = (idToFind) => {

  if (typeof idToFind !== 'number' || idToFind < 1)
    return Promise.reject(new Error(`Invalid user Id`));

  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const userFound = users.find(user => user.id === idToFind);

      if (userFound) {
        return resolve(userFound);
      }
      reject(new Error(`User with id : ${idToFind}, not found`));
    }, 2000);
  });
};

const showUser = async (userId) => {
  console.log(`Getting user with Id ${userId}`);

  try {
    const user = await getUserById(userId);
    console.log(`Resolved successfully, the user is ${JSON.stringify((user))} `)
  } catch (error) {
    console.error(error.message);
  }
};

// showUser(0);
showUser(1);
// showUser(2);
// showUser(3);
// showUser('a')
// showUser(11);

