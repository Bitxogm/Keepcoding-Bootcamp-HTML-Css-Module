
const saluda = new Promise((resolve, reject) => {
    setTimeout(() => {
        // reject('Hola Mundo!');
        resolve('Hola Mundo!');
    }, 1000);
});

saluda.then(res => {
    console.log(res);
})
.catch(err => {
    console.error('Fatal Error', err);
});

// TODO: Crea una promesa de azar con un 20% de posibilidades de fallar
// y devolver el valor en 2 segundos
const azar = new Promise((res, rej) => {
    setTimeout(() => {
        const rnd = Math.random();
        if (rnd <= 0.2) {
            rej(`Azar falló con: ${rnd.toFixed(2)}`);
        } else {
            res(`Azar OK con: ${rnd.toFixed(2)}`);
        }
    }, 2000);
});

azar.then(res => {
    console.log(res);
})
.catch(err => {
    console.error(err);
});

// function paso1() {
//     return new Promise((res, rej) => {
//         res('Paso 1 resuelto');
//     });
// };

async function paso1() {
    return 'Paso 1 resuelto';
};

// function paso2() {
//     return Promise.resolve('Paso 2 resuelto');
// };

async function paso2() {
    return 'Paso 2 resuelto';
};

function paso3() {
    return Promise.reject('Paso 3 fallo');
};

// async function paso3() {
//     return 'Paso 3 fallo';
// };

// paso1()
//     .then(res => {
//         console.log(res);
//         return paso2();
//     })
//     .then(res => {
//         console.log(res);
//         return paso3();
//     })
//     .then(res => {
//         console.log(res);
//     })
//     .catch(err => {
//         console.error('Fatal error: ', err);
//     })
//     .finally(() => {
//         console.log('Flujo finalizado');
//     });

Promise.all([
    paso1(),
    paso2(),
    // paso3()
])
.then(result => {
    console.log(result);
})
.catch(error => {
    console.error('Fatal Error: ', error);
});

Promise.race([
    saluda, // 1s
    azar // 2s
])
.then(res => {
    console.log(res)
})
.catch(err => {
    printError(err);
});


async function ejecutaPasos() {
    try {
        const res1 = await paso1();
        console.log(res1);
        
        const res2 = await paso2();
        console.log(res2);
        
        const res3 = await paso3();
        console.log(res3);
    } catch(ex) {
        printError(ex);
    }
    
}
ejecutaPasos();

// Saluda 3 veces
async function saluda5Veces() {
    // No es lo mismo un bucle for que un [..].map()
    for (let i = 0; i < 5; i++) {
        const msg = await paso1();
        console.log(msg);
    }
};
saluda5Veces();



function printError(err) {
    console.log('Fatal error: ', err);
}