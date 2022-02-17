const express = require("express");
const router = express.Router();

const {
  getHomeVideos,
  searchVideos,
  fetchUserVideo,
  fetchVideosList,
  createVideo,
  deleteVideo,
  toggleLikeVideo,
  toggleDislikeVideo,
  getVideoDetails,
} = require("../controllers/videoController");
const authMiddleware = require("../middlewares/auth");

// video routes

module.exports = router;
