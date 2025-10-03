
// setTimeout(() => {
//   console.log('asincronia 1');
// }, 1000);
// setTimeout(() => {
//   console.log('asincronia 2');
// }, 550);  

// console.log('sincrono 1');
// console.log('sincrono 2');


//Callbacks
const getProducts = (callback) => {
  setTimeout(() => {
    callback(null, products = [
      {id: 1, name: 'TV'},
      {id: 2, name: 'PC'},
      {id: 3, name: 'Cap'},
    ]);
  }, 1000);
};

const getProductsName = (name, callback) => {
  setTimeout(() => {
    callback(null, name)
  },4000);
  
}

getProducts((error, products) => {
  if (error) {
    console.log(error);
  } else {
    console.log(products);
  }
});


//Promesas 

const downloadUserData = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log('downloadUserData');
      resolve('user 1');
    }, 1000);
  });
};
const proccessUserData = () => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log('proccessUserData');
      resolve('user error in proccessUserData');
    }, 2000);
  });
};
const displayUserDashboard = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log('proccessUserData');
      resolve();
    }, 2000);
  });
};

downloadUserData()
  .then(() =>  proccessUserData())
  .then(() => displayUserDashboard())
  .then(() => console.log('fin'))
  .catch((error) => console.log(error));


//Async/Await

