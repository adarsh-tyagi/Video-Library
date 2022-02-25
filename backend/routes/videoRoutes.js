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
router.route("/").get(getHomeVideos);
router.route("/search").get(searchVideos);
router.route("/user/videos").get(authMiddleware, fetchUserVideo);
router.route("/list").post(authMiddleware, fetchVideosList);
router.route("/create").post(authMiddleware, createVideo);
router.route("/delete").post(authMiddleware, deleteVideo);
router.route("/like").post(authMiddleware, toggleLikeVideo);
router.route("/dislike").post(authMiddleware, toggleDislikeVideo);
router.route("/details/:videoId").get(authMiddleware, getVideoDetails);

module.exports = router;
