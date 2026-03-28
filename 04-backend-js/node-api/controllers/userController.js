import { hash } from 'bcrypt';

import { users } from '../data/Users.js';
import { User } from '../models/User.js';

export const userController = {

    getAll: (req, res, next) => {
        let retUsers = users;

        // Filtrar todos los usuarios por su rol
        if ( req.query.role ) {
            retUsers = users.filter( u => u.role === req.query.role );
        }

        // Mediante un parametro skip, nos saltamos los primeros
        // Mediante un parametro limit, decidimos cuantos queremos
        // if ( req.query.skip ) {
        //     retUsers = retUsers.slice(skip);
        // }

        // if ( req.query.limit ) {
        //     retUsers = retUsers.slice(0, limit);
        // }

        if ( req.query.skip || req.query.limit ) {
            // Recordad que los query params son strings
            // Hay que convertirlos a números
            // parseInt
            const skip = parseInt(req.query.skip) || 0;
            const limit = parseInt(req.query.limit);
            console.log(skip, limit);
            retUsers = retUsers.slice(
                skip,
                isNaN(limit) ? undefined : skip + limit
            );
        }

        res.status(200).json(retUsers);
    },

    getOneById: (req, res, next) => {
        // El id de usuario lo tengo disponible en req.params.id
        // Filtro todos los usuarios
        const id = Number.parseInt(req.params.id);

        if( isNaN(id) ) {
            return next();
        }

        // TODO: Esperamos un objeto, no un array de un elemento
        //! Tiene sentido devolver un 200 sin contenido cuando no encuentra el usuario?

        const userFind = users.find( u => u.id === id );

        // Validarlo
        if( !userFind ) {
            // return res.status(404).json({
            //     error: 'User not found',
            // });
            return next();
        }

        res.status(200).json(
            userFind
        );
    },

    add: async(req, res, next) => {

        const user = new User({
            email: req.body.email,
            // password: req.body.password
        });

        user.password = await User.hashPassword(req.body.password);

        try {

            const savedUser = await user.save();
            savedUser.password = undefined;
            res.status(201).json(savedUser);

        } catch(ex) {
            if (ex.code && ex.code === 11000) {
                res.status(400).json({
                    message: 'Email duplicado'
                });
            } else {
                res.status(500).json({
                    message: 'Internal Server Error'
                })
            }
        }
    }


}