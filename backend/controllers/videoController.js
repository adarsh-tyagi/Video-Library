const ErrorHandler = require("../utils/errorHandler");
const catchAsyncErrors = require("../middlewares/catchAsyncErrors");
const Video = require("../models/videoModel");
const cloudinary = require("cloudinary");
const User = require("../models/userModel");

// get home videos
exports.getHomeVideos = catchAsyncErrors(async (req, res, next) => {});

// create new video
exports.createVideo = catchAsyncErrors(async (req, res, next) => {});

// get video details
exports.getVideoDetails = catchAsyncErrors(async (req, res, next) => {});

// delete video
exports.deleteVideo = catchAsyncErrors(async (req, res, next) => {});

// fetch user's video
exports.fetchUserVideo = catchAsyncErrors(async (req, res, next) => {});

// like a video
exports.likeVideo = catchAsyncErrors(async (req, res, next) => {});

// dislike a video
exports.dislikeVideo = catchAsyncErrors(async (req, res, next) => {});
