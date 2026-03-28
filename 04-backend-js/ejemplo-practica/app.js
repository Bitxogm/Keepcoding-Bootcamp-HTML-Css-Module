import express from 'express';
import path from 'path';
import cookieParser from 'cookie-parser';
import morgan from 'morgan';
import createError from 'http-errors';
import { renderFile } from 'ejs';

import { connectMongoose } from './lib/connectMongoose.js';
import { sessionInViews, sessionMiddleware } from './lib/authMiddleware.js';

import { router as indexRouter } from './routes/webRoutes.js';

export const app = express();

const connection = await connectMongoose();
console.log(`Connected to MongoDB: ${connection.name}`);

// view engine setup
app.set('views', path.join(path.dirname(new URL(import.meta.url).pathname), 'views'));
app.set('view engine', 'html');
app.engine('html', renderFile);

app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(path.dirname(new URL(import.meta.url).pathname), 'public')));

app.use(function(req, res, next) {
  res.locals.appName = 'KCWB 19 - NodePOP';
  res.locals.env = process.env.ENVIRONMENT || 'development';
  next();
});

app.use(sessionMiddleware);
app.use(sessionInViews);

app.use('/', indexRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

