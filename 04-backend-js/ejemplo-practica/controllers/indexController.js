import { validationResult } from 'express-validator';

import { Product } from '../models/index.js';


export async function indexAction(req, res, next) {
    try {
        const userId = req.session.userId;
        const page = parseInt(req.query.page) || 1;
        const limit = 9; // Number of products per page
        const skip = (page - 1) * limit;
        const allTags = await Product.distinct('tags', { owner: userId });

        const filters = {
            tag: req.query.tag || '',
            name: req.query.name || '',
            priceMin: req.query.priceMin || '',
            priceMax: req.query.priceMax || '',
        };

        const queryFilters = {
            owner: userId,
        };

        if (filters.name) {
            queryFilters.name = new RegExp(filters.name, 'i');
        }

        if (filters.tag) {
            queryFilters.tags = filters.tag;
        }

        if (req.query.priceMin) {
            queryFilters.price = { ...queryFilters.price, $gte: parseFloat(req.query.priceMin) };
        }

        if (req.query.priceMax) {
            queryFilters.price = { ...queryFilters.price, $lte: parseFloat(req.query.priceMax) };
        }

        const products = await Product.find({
            owner: userId,
            ...queryFilters,
        }).skip(skip).limit(limit);

        const totalProducts = await Product.countDocuments({
            owner: userId,
            ...queryFilters,
        });
        const totalPages = Math.ceil(totalProducts / limit);
        
        res.render('index', { products, filters, tags: allTags, currentPage: page, totalPages });

    } catch (error) {
        next(error);
    }
};

export function addProductAction(req, res, next) {
    res.locals.errors = '';
    res.locals.name = '';
    res.locals.price = '';
    res.locals.tags = '';
    res.render('add-product');
};

export async function createProductAction(req, res, next) {
    try {
        const userId = req.session.userId;

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            res.locals.errors = errors.array().map(error => error.msg).join(', ');
            res.locals.name = req.body.name;
            res.locals.price = req.body.price;
            res.locals.tags = req.body.tags;
            return res.render('add-product');
        };

        const product = new Product({
            name: req.body.name,
            price: req.body.price,
            tags: req.body.tags ? req.body.tags.split(',').map(tag => tag.trim()) : [],
            owner: userId,
        });
        await product.save();
        res.redirect('/');
    } catch (error) {
        res.locals.errors = error.message;
        res.locals.name = req.body.name;
        res.locals.price = req.body.price;
        res.locals.tags = req.body.tags;
        res.render('add-product');
    }
};

export async function deleteProductAction(req, res, next) {
    try {
        const userId = req.session.userId;
        const productId = req.params.id;

        // Asegurarse que el producto pertenece al usuario
        await Product.deleteOne({
            _id: productId,
            owner: userId,
        });

        res.redirect('/');
    } catch (error) {
        next(error);
    }
};