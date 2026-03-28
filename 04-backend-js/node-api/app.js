import express from 'express';
import morgan from 'morgan';
import { renderFile } from 'ejs';

// Database
// import { dbClient } from './lib/connectMongo.js';
import { connectMongoose } from './lib/connectMongoose.js';

// Middlewares
import { filterAdminPath, filterFirefox, guard, sessionInViews, sessionMiddleware } from './lib/middlewares/authMiddleware.js';
import { serverErrorHandler, notFoundErrorHandler } from './lib/middlewares/errorMiddleware.js';

// Routes
import { router as webRouter } from './routes/webRoutes.js';
import { router as apiRouter } from './routes/apiRoutes.js';

const app = express();

// Top level await disponible desde ES2022 en modulos.
const connection = await connectMongoose();
console.log(`Connected to MongoDB: ${connection.name}`);

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(express.static('public'));
app.set('view engine', 'ejs');
app.engine('html', renderFile); // Con esto podemos escrivir nuestros templates con extensión .html
app.set('views', './views');

// 3rd Party Middlewares
app.use(morgan('dev'));

/**
 * Middlewares
 ********/

app.use((req, res, next) => {
    // Si algún middlewere no llama a next() la petición se queda congelada.
    // console.log("Soy un middlewere");
    // res.send("Hola mundo");
    next();
});

// Setting Environment
app.use((req, res, next) => {
    res.locals.env = process.env.NODE_ENV;
    res.locals.appName = 'NodeApi KC 19';
    next();
});

app.use((req, res, next) => {
    // res.status(403).send("Access forbidden");
    next();
});


app.use((req, res, next) => {
    // console.log(req);
    // console.log({
    //     headers: req.headers,
    //     host: req.host,
    //     url: req.url,
    //     method: req.method,
    //     ip: req.ip,
    // })
    next();
});

/**
 * Filter middlewares
 */
app.use(filterAdminPath);
app.use(filterFirefox);
app.use(sessionMiddleware);
app.use(sessionInViews);



/**
 * Routes
 ********/
app.use('/', webRouter);
app.use('/api', apiRouter);


/**
 * Error Handlers
 ********/
// app.get('/', (req, res, next) => {
//     throw new Error("Fatal Error");
//     // res.send('Hello world!!!');
// });
app.use(serverErrorHandler);
// 404 Error Handler
// Este debe ser el último middleware
app.use(notFoundErrorHandler);


export default app;