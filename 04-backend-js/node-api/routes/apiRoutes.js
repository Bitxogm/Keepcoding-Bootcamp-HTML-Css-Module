import express from 'express';
import { query, param } from 'express-validator'; 

// Controllers
import { healthCall } from '../controllers/healthController.js';
import { getDemo, getDownload, getEnd, getFile, getOneParamOptional, getRedirect, getTwoParams } from '../controllers/demoController.js';
import { userController } from '../controllers/userController.js';
import { todoController } from '../controllers/todoController.js';
import { agentController } from '../controllers/agentController.js';

export const router = express.Router();

// Health endpoint
router.get(['/health', '/ping'], healthCall);

// Demo & Params
router.get('/demo', getDemo);
router.get('/download', getDownload);
router.get('/file', getFile);
router.get('/redirect', getRedirect);
router.get('/end', getEnd);
// router.get('/params/:id', getOneParam);
router.get('/params/{:id}', getOneParamOptional);
router.get('/params/:company/:username', getTwoParams);

// Users
// /api/users -> Devuelve todos los usuarios
router.get('/users', userController.getAll);
// Como hacemos para tener un unico usuario?
router.get('/users/:id', userController.getOneById);
router.post('/users', userController.add);

// Agent routes
router.get('/agents', agentController.getAll);
router.post('/agents', agentController.add);

// Todos
router.get(
    '/todos',
    // Validaciones
    query('completed', 'Must be a valid boolean')
    // Si es opcional, lo validara
    .optional()
    // Valida a booleano
    .isBoolean()
    // Sanitiza a booleano
    .toBoolean(),

    query('skip', 'Must be a valid positive number')
        .optional()
        .isInt({
            min: 1,
        })
        .toInt(),
    query('limit', 'Must be a valid positive number')
        .optional()
        .isInt({
            min: 1
        })
        .toInt(),

    query('userId', 'Must be a valid positive number')
        .optional()
        .isInt({ min: 1 })
        .toInt(),

    // Controlador
    todoController.getAll
);
router.get(
    '/todos/:id',
    param('id')
    .notEmpty()
    .isString(),
todoController.getOneById);
router.post('/todos/', todoController.add);
router.put('/todos/:id', todoController.update);
router.delete('/todos/:id', todoController.remove);