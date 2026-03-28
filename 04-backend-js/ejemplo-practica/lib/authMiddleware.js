import session from 'express-session';
import ConnectMongo from 'connect-mongo';

export function guard(req, res, next) {
    const redirectUrl = '/login?redirect=' + encodeURIComponent(req.originalUrl);
    if (!req.session.userId) {
        return res.redirect(redirectUrl);
    }
    next();
};

const INACTIVITY_2_DAYS = 1000 * 60 * 60 * 24 * 2;

export const sessionMiddleware = session({
    name: 'ejemplo-practica-session',
    secret: process.env.SESSION_SECRET || 'supersecreto',
    saveUninitialized: true,
    resave: false,
    cookie: {
        maxAge: INACTIVITY_2_DAYS,
    },
    store: ConnectMongo.create({
        mongoUrl: process.env.MONGODB_URL || 'mongodb://localhost:27017/ejemplo-practica',
    })
});

export function sessionInViews(req, res, next) {
    res.locals.session = req.session;
    next();
}