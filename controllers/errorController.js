const AppError=require('./../utils/appError');
const handleCastErrorDB = err => {
  const message = `Invalid ${err.path}: ${err.value}.`;
  return new AppError(message, 400);
};
const handleDuplicateFieldsDB = err => {
  // const value = err.errmsg.match(/(["'])(\\?.)*?\1/)[0];
  // console.log(value);

  // const message = `Duplicate field value: ${value}. Please use another value!`;
  // return new AppError(message, 400);
  const errorMessage = err.message || err.errmsg || '';
  
  // Extract the duplicated value from the error message
  const duplicateFieldPattern = /(["'])(\\?.)*?\1/;
  const match = duplicateFieldPattern.exec(errorMessage);

  // Default value if no match is found
  const value = match ? match[0] : 'unknown value';

  // Log the extracted value for debugging purposes
  console.log(value);

  // Construct the custom error message
  const message = `Duplicate field value: ${value}. Please use another value!`;
  return new AppError(message, 400);
};
const handleValidationErrorDB = err => {
  const errors = Object.values(err.errors).map(el => el.message);
  const message = `Invalid input data. ${errors.join('. ')}`;
  return new AppError(message, 400);
};
const handleJWTError = () =>
  new AppError('Invalid token. Please log in again!', 401);

const handleJWTExpiredError = () =>
  new AppError('Your token has expired! Please log in again.', 401);



const sendErrorDev=(err,req,res)=>{
  if (req.originalUrl.startsWith('/api')) {
    return res.status(err.statusCode).json({
      status: err.status,
      error: err,
      message: err.message,
      stack: err.stack
    });
  }
  // B) RENDERED WEBSITE
  console.error('ERROR 💥', err);
  return res.status(err.statusCode).render('error', {
    title: 'Something went wrong!',
    msg: err.message
  });
}
const sendErrorProd = (err, req, res) => {
  // A) API
  if (req.originalUrl.startsWith('/api')) {
    // A) Operational, trusted error: send message to client
    if (err.isOperational) {
      return res.status(err.statusCode).json({
        status: err.status,
        message: err.message
      });
    }
    // B) Programming or other unknown error: don't leak error details
    // 1) Log error
    console.error('ERROR 💥', err);
    // 2) Send generic message
    return res.status(500).json({
      status: 'error',
      message: 'Something went very wrong!'
    });
  }

  // B) RENDERED WEBSITE
  // A) Operational, trusted error: send message to client
  if (err.isOperational) {
    console.log(err);
    return res.status(err.statusCode).render('error', {
      title: 'Something went wrong!',
      msg: err.message
    });
  }
  // B) Programming or other unknown error: don't leak error details
  // 1) Log error
  console.error('ERROR 💥', err);
  // 2) Send generic message
  return res.status(err.statusCode).render('error', {
    title: 'Something went wrong!',
    msg: 'Please try again later.'
  });
};
module.exports=(err,req,res,next)=>{
   // console.log(err.stack);
    err.statusCode=err.statusCode||500;
    err.status=err.status||'error';
    if (process.env.NODE_ENV === 'development') {
      sendErrorDev(err, req,res);
    } else if (process.env.NODE_ENV === 'production') {
      //let error = {...err};
      let error = Object.assign({}, err);
  error.message = err.message;
  error.name = err.name;
  error.isOperational = err.isOperational;
    if (error.name === 'CastError') error = handleCastErrorDB(error);
    if (error.code === 11000) error = handleDuplicateFieldsDB(error);
     if (error.name === 'ValidationError') error = handleValidationErrorDB(error);
    if (error.name === 'JsonWebTokenError') error = handleJWTError();
     if (error.name === 'TokenExpiredError') error = handleJWTExpiredError();

    sendErrorProd(error, req,res);
    }
    }