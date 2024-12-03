import express from 'express';
import httpStatus from 'http-status';

const app = express();

// TEST ROUTE
app.get('/', (req, res) => {
  res.status(httpStatus.OK).json({
    success: true,
    message: 'Hello from test route',
  });
});

// NOT FOUND ROUTE
// app.use(notFound);

export default app;
