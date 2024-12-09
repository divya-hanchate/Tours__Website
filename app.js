const path=require('path');
const express = require('express');
const morgan = require('morgan');
const rateLimit=require('express-rate-limit');
const helmet=require('helmet');
const mongoSanitize=require('express-mongo-sanitize');
const xss=require('xss-clean');
const hpp=require('hpp');
const cookieParser = require('cookie-parser');
const AppError =require('./utils/appError');
const globalErrorHandler=require('./controllers/errorController')
const tourRouter = require('./routes/tourRoutes');
const userRouter = require('./routes/userRoutes');
const reviewRouter = require('./routes/reviewRoutes');
//const bookingRouter = require('./routes/bookingRoutes');

const viewRouter = require('./routes/viewRoutes');
const app = express();
// 1) GLOBAL MIDDLEWARES
// Set security HTTP headers
app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname,'public')));
app.use(helmet());

// 1) MIDDLEWARES
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}
// Limit requests from same API
const limiter = rateLimit({
  max: 100,
  windowMs: 60 * 60 * 1000,
  message: 'Too many requests from this IP, please try again in an hour!'
});
app.use('/api', limiter);
app.use(express.json({ limit: '50kb' }));
app.use(express.urlencoded({ extended: true, limit: '50kb' }));
app.use(cookieParser());

// Data sanitization against NoSQL query injection
app.use(mongoSanitize());

// Data sanitization against XSS
app.use(xss());
// app.use(express.static(path.join(__dirname,'public')));

// Prevent parameter pollution for sorting used two times
app.use(
  hpp({
    whitelist: [
      'duration',
      'ratingsQuantity',
      'ratingsAverage',
      'maxGroupSize',
      'difficulty',
      'price'
    ]
  })
);

// app.use(express.static(`${__dirname}/public`));
// app.use((req, res, next) => {
//   // eslint-disable-next-line no-console
//   console.log('Hello from the middleware 👋');
//   next();
// });

app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  //console.log(req.cookies)
  next();
});

// 3) ROUTES

app.use('/', viewRouter);
app.use('/api/v1/tours', tourRouter);
app.use('/api/v1/users', userRouter);
app.use('/api/v1/reviews', reviewRouter);
//app.use('/api/v1/bookings', bookingRouter);

app.all('*', (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
  // res.status(404).json({
  //   status: 'failed',
  //   results: `can't find ${req.originalUrl} on the server`
  // });
  // const err=new Error(`can't find ${req.originalUrl} on the server`);
  // err.status='fails';
  // err.statusCode=404;
  //next(err)
});
app.use(globalErrorHandler)
module.exports = app;
