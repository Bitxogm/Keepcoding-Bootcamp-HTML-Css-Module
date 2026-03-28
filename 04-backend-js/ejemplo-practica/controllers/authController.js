import { User } from '../models/User.js';

export function loginAction(req, res, next) {
    res.locals.email = '';
    res.locals.errors = '';
    res.render('login');
};

export async function loginPostAction(req, res, next) {
    const { email, password } = req.body;

    try {

        const user = await User.findOne({ email }).select('+password');

        if (!user || !(await user.comparePassword(password))) {
            res.locals.email = email;
            res.locals.errors = 'Invalid credentials.';
            return res.render('login');
        }

        req.session.userId = user.id;

        res.redirect( req.query.redir || '/' );

    } catch (error) {
        next(error);
    }
};

export function logoutAction(req, res, next) {

    req.session.regenerate((err) => {
        if (err) {
            return next(err);
        }
        res.redirect('/');
    });

};