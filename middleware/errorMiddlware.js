const errorMiddleware = (error, req, res, next) => {

  return res.status(error.statusCode || 500).json({
    success: false,
    message: error.message || "Internal Server Error",
  });
  
};

module.exports = errorMiddleware;
