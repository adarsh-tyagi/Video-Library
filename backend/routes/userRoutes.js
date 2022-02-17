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
} = require("../controllers/userController");
const authMiddleware = require("../middlewares/auth");

// user routes


module.exports = router;
