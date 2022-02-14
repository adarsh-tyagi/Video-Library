const ErrorHandler = require("../utils/errorHandler");

module.exports = async (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.message = err.message || "Internal Server Error";

  // wrong mongodb id
  if (err.name === "CastError") {
    const message = `Resource not found. Invalid ${err.path}`;
    err = new ErrorHandler(message, 400);
  }

  // mongoose duplicate key error
  if (err.code === 11000) {
    const message = `Duplicate ${Object.keys(err.keyValue)} entered.`;
    err = new ErrorHandler(message, 400);
  }

  // invalid jsonwebtoken error
  if (err.name === "JsonWebTokenError") {
    const message = "Json web token is invalid. Try again";
    err = new ErrorHandler(message, 400);
  }

  // expired jsonwebtoken error
  if (err.name === "TokenExpiredError") {
    const message = "Json web token has expired. Try again";
    err = new ErrorHandler(message, 400);
  }

  res.status(err.statusCode).json({ success: false, message: err.message });
};
