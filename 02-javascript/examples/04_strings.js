console.log('04')

let username = 'Pepe    ';
let  password = ' Segura1234  ';
let email = true

username = username.toLowerCase().trim().toUpperCase();
password = password.trim();


let message = '';
if (username === 'PEPE' && password === 'Segura1234' && email == '1') {
  message = 'Bienvenido pepe';
} else {
  message = 'No te reconozco';
}
console.log(message);

const emailPepe = ' pepe@.com  ';

console.log(emailPepe.trim().includes('@'));
console.log(emailPepe.replace('e', 'a'));
console.log(emailPepe.replaceAll('e', 'a'));
console.log(emailPepe.match('e'));
console.log(emailPepe.length);

const newPrice = '122.33'
console.log(parseInt(newPrice));
console.log(parseFloat(newPrice));
console.log(Number(newPrice));
console.log(+newPrice);

const email2 = prompt('Ingrese su email');
if(email2 === null){
  //Lanzamos error propio
  throw new Error('El email es requerido');
}




















