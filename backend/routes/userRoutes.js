const express = require("express");
const router = express.Router();

const {
  registerUser,
  loginUser,
  logoutUser,
  getUserDetails,
  deleteUserAccount,
  updateUserDetails,
  forgotPassword,
  resetPassword,
  addWatchLater,
  getWatchLater,
  removeWatchLater,
  addHistory,
  getHistory,
  removeHistory,
  createPlaylist,
  removePlaylist,
  getPlaylists,
  addVideoPlaylist,
  removeVideoPlaylist,
  getLikedVideos,
} = require("../controllers/userController");
const authMiddleware = require("../middlewares/auth");

// user routes
router.route("/register").post(registerUser);
router.route("/login").post(loginUser);
router.route("/logout").get(authMiddleware, logoutUser);
router
  .route("/me")
  .get(authMiddleware, getUserDetails)
  .delete(authMiddleware, deleteUserAccount)
  .put(authMiddleware, updateUserDetails);

// password routes
router.route("/forgot/password").post(forgotPassword);
router.route("/reset/password/:token").put(resetPassword);

// watchlater routes
router.route("/watchlater").get(authMiddleware, getWatchLater);
router.route("/watchlater/add").post(authMiddleware, addWatchLater);
router.route("/watchlater/remove").post(authMiddleware, removeWatchLater);

// history routes
router.route("/history").get(authMiddleware, getHistory);
router.route("/history/add").post(authMiddleware, addHistory);
router.route("/history/remove").post(authMiddleware, removeHistory);

// playlists routes
router.route("/playlists").get(authMiddleware, getPlaylists);
router.route("/playlists/create").post(authMiddleware, createPlaylist);
router.route("/playlists/remove").post(authMiddleware, removePlaylist);
router.route("/playlists/add/video").post(authMiddleware, addVideoPlaylist);
router
  .route("/playlists/remove/video")
  .post(authMiddleware, removeVideoPlaylist);

router.route("/liked").get(authMiddleware, getLikedVideos);

module.exports = router;
