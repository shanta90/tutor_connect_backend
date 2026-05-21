const errorMiddleware = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;

  if (process.env.NODE_ENV === 'development') {
    res.status(err.statusCode).json({
      success: false,
      message: err.message,
      stack: err.stack,
      error: err,
    });
  } else {
    res.status(err.statusCode).json({
      success: false,
      message: err.statusCode === 500 ? 'Something went wrong' : err.message,
    });
  }
};

export default errorMiddleware;
