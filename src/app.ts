import express from 'express';
import httpStatus from 'http-status';
import morgan from 'morgan';

import { AuthRouter } from './modules/auth/auth.route';
import envConfig from './config/env.config';
import notFound from './middlewares/notFound';
import globalError from './middlewares/globalError';
import { UserRouter } from './modules/user/user.route';

const app = express();

// GLOBAL MIDDLEWARES
app.use(express.json());
if (envConfig.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

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

// NOT FOUND ROUTE
app.use(notFound);

// GLOBAL MIDDLEWARE
app.use(globalError);

export default app;
