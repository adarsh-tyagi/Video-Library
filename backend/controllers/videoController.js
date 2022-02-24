const ErrorHandler = require("../utils/errorHandler");
const catchAsyncErrors = require("../middlewares/catchAsyncErrors");
const Video = require("../models/videoModel");
const cloudinary = require("cloudinary");

// get home videos
exports.getHomeVideos = catchAsyncErrors(async (req, res, next) => {
  const latest_videos = await Video.find()
    .sort({ created_at: -1 })
    .limit(10)
    .populate("owner");
  const popular_videos = await Video.find()
    .sort({ likes: -1 })
    .limit(5)
    .populate("owner");
  const all_videos = await Video.find().populate("owner");
  res
    .status(200)
    .json({ success: true, all_videos, latest_videos, popular_videos });
});

// search videos
exports.searchVideos = catchAsyncErrors(async (req, res, next) => {
  const exp = new RegExp(req.query.search, "ig");
  const searchResults = await Video.find({ title: exp })
    .populate("owner")
    .limit(5);
  res.status(200).json({ success: true, searchResults });
});

// fetch videos list
exports.fetchVideosList = catchAsyncErrors(async (req, res, next) => {
  let videos_list = [];
  for (let video of req.body.videos_list) {
    const video_details = await Video.findById(video).populate("owner");
    videos_list.push(video_details);
  }
  res.status(200).json({ success: true, videos_list });
});

// create new video
exports.createVideo = catchAsyncErrors(async (req, res, next) => {
  const { title, description, video } = req.body;
  const myCloud = await cloudinary.v2.uploader.upload(video, {
    folder: "videoLibrary-videos",
  });
  const newVideo = await Video.create({
    title,
    description,
    owner: req.user._id,
    // video: {
    //   public_id: "samples/elephants",
    //   url: "https://res.cloudinary.com/dpsyvbeem/video/upload/v1634397373/samples/elephants.mp4",
    // },
    video: { public_id: myCloud.public_id, url: myCloud.secure_url },
  });
  res
    .status(201)
    .json({ success: true, newVideo, message: "Video uploaded successfully" });
});

// get video details
exports.getVideoDetails = catchAsyncErrors(async (req, res, next) => {
  const video = await Video.find({ _id: req.params.videoId }).populate("owner");
  res.status(200).json({ success: true, video });
});

// delete video
exports.deleteVideo = catchAsyncErrors(async (req, res, next) => {
  await Video.deleteOne({ _id: req.body.videoId, owner: req.user._id });
  res
    .status(200)
    .json({ success: true, message: "Video deleted successfully" });
});

// fetch user's video
exports.fetchUserVideo = catchAsyncErrors(async (req, res, next) => {
  const user_videos = await Video.find({ owner: req.user._id });
  res.status(200).json({ success: true, user_videos });
});

// like a video
exports.toggleLikeVideo = catchAsyncErrors(async (req, res, next) => {
  const video = await Video.findById(req.body.videoId).populate("owner");
  if (video.dislikes.includes(String(req.user._id))) {
    return next(new ErrorHandler("You already disliked the video", 400));
  }
  if (video.likes.includes(String(req.user._id))) {
    video.likes = video.likes.filter((like) => like !== String(req.user._id));
  } else {
    video.likes.push(String(req.user._id));
  }
  await video.save();
  res
    .status(200)
    .json({ success: true, video, message: "You liked this video" });
});

// dislike a video
exports.toggleDislikeVideo = catchAsyncErrors(async (req, res, next) => {
  const video = await Video.findById(req.body.videoId).populate("owner");
  if (video.likes.includes(String(req.user._id))) {
    return next(new ErrorHandler("You already liked the video", 400));
  }
  if (video.dislikes.includes(String(req.user._id))) {
    video.dislikes = video.dislikes.filter(
      (dislike) => dislike != String(req.user._id)
    );
  } else {
    video.dislikes.push(String(req.user._id));
  }
  await video.save();
  res
    .status(200)
    .json({ success: true, video, message: "You disliked this video" });
});
