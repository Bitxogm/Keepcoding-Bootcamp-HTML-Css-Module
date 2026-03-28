import express from 'express';
import { body } from 'express-validator';

import { indexAction, addProductAction, createProductAction, deleteProductAction } from '../controllers/indexController.js';
import { loginAction, loginPostAction, logoutAction } from '../controllers/authController.js';
import { guard } from '../lib/authMiddleware.js';

export const router = express.Router();

/* GET home page. */
router.get('/', guard, indexAction);
router.get('/products/new', guard, addProductAction);
router.post('/products/new',
    guard,
    body('name').notEmpty().isLength({ min: 4 }).withMessage('Name is required and must be at least 4 characters long'),
    body('price').isFloat({ gt: 0 }).withMessage('Price must be a positive number'),
    createProductAction
);
router.post('/products/delete/:id', guard, deleteProductAction);

router.get('/login', loginAction);
router.post('/login', loginPostAction);
router.get('/logout', logoutAction);