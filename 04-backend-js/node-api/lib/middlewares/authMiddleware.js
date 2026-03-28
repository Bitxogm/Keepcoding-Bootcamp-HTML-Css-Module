import session from 'express-session';
import ConnectMongo from 'connect-mongo';

const INACTIVITY_2_DAYS = 1000 * 60 * 60 * 24 * 2;

// Filtrar todas las peticiones a /admin -> 403
export function filterAdminPath(req, res, next) {
    if (req.url.startsWith('/admin')) {
        return res.status(403).send("Forbidden Access to /admin path");
    }
    next();
};

// Rechaza todas las peticiones que vengan desde un navegador Firefox
export function filterFirefox(req, res, next) {
    // Forbidden for firefox users
    if (
        req.headers['user-agent'] && req.headers['user-agent'].includes('Firefox')
    ) {
        return res.status(403).send("Forbidden for Firefox users");
    }
    next();
}

export function guard(req, res, next) {
    const redirect = req.url;
    if ( !req.session.userId ) {
        // Si no tenemos sesión, al login
        return res.redirect(`/login?redir=${redirect}`);
    };
    next();
}

export const sessionMiddleware = session({
    name: 'nodeapi-session',
    secret: 'supersecreto',
    saveUninitialized: true, // Crea una sesión vacía para cada usuario,
    resave: false,
    cookie: {
        maxAge: INACTIVITY_2_DAYS,
        // maxAge: 2000,
    },
    store: ConnectMongo.create({
        mongoUrl: process.env.MONGO_URI || 'mongodb://localhost:27017',
    })
});

export function sessionInViews(req, res, next) {
    res.locals.session = req.session;
    next();
}