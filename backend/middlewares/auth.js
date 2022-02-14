const catchAsyncError = require("./catchAsyncErrors");
const ErrorHandler = require("../utils/errorHandler");
const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

module.exports = catchAsyncError(async (req, res, next) => {
  // fetch token and decode the user id
  const token = req.header("Authorization");
  if (!token) {
    next(new ErrorHandler("Please login to access the resource", 401));
  }
  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  const user = await User.findOne({ _id: decoded._id });

  if (!user) {
    next(new ErrorHandler("Please login to access the resource", 401));
  }
  req.user = user;
  next();
});
