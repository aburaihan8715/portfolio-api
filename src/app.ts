import express from 'express';
import httpStatus from 'http-status';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';

import { AuthRouter } from './modules/auth/auth.route';
import envConfig from './config/env.config';
import notFound from './middlewares/notFound';
import globalError from './middlewares/globalError';
import { UserRouter } from './modules/user/user.route';
import { CategoryRouter } from './modules/category/category.route';
import { ShopRouter } from './modules/shop/shop.route';
import { ProductRouter } from './modules/product/product.route';

const app = express();

// GLOBAL MIDDLEWARES
app.use(express.json());
app.use(cookieParser());
if (envConfig.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// TEST MIDDLEWARE
app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});

// TEST ROUTE
app.get('/', (req, res) => {
  res.status(httpStatus.OK).json({
    success: true,
    message: 'Hello from test route',
  });
});

// ROUTES
app.use('/api/v1/auth', AuthRouter);
app.use('/api/v1/users', UserRouter);
app.use('/api/v1/categories', CategoryRouter);
app.use('/api/v1/shops', ShopRouter);
app.use('/api/v1/products', ProductRouter);

// NOT FOUND ROUTE
app.use(notFound);

// GLOBAL MIDDLEWARE
app.use(globalError);

export default app;
