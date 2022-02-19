const ErrorHandler = require("../utils/errorHandler");
const catchAsyncErrors = require("../middlewares/catchAsyncErrors");
const User = require("../models/userModel");
const sendMail = require("../utils/sendEmail");
const crypto = require("crypto");
const cloudinary = require("cloudinary");
const bcrypt = require("bcryptjs");

// register user
exports.registerUser = catchAsyncErrors(async (req, res, next) => {
  const { name, email, password, avatar } = req.body;
  if (!name || !email || !password || !avatar) {
    return next(new ErrorHandler("Please enter all fields", 400));
  }
  //   const myCloud = await cloudinary.v2.uploader.upload(avatar, {
  //     folder: "videoLibrary-avatars",
  //   });
  const user = await User.create({
    name,
    email,
    password,
    avatar: {
      public_id: "public_id",
      url: "url",
    },
    // avatar: {
    //   public_id: myCloud.public_id,
    //   url: myCloud.secure_url,
    // },
  });
  try {
    const message = `Welcome ${name},\nYou are successfully registered.\n\nThanks,\nVideo Library Team`;
    await sendMail({
      email: email,
      subject: "Video Library - Welcome",
      message,
    });
  } catch (error) {
    console.log("Email not sent. Something is off");
  }
  const token = user.getJWTToken();
  res.status(201).json({
    success: true,
    user,
    token,
    message: "You are registered successfully",
  });
});

// login user
exports.loginUser = catchAsyncErrors(async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return next(new ErrorHandler("Please enter all fields", 400));
  }
  const user = await User.findOne({ email }).select("+password");
  if (!user) {
    return next(new ErrorHandler("Invalid email or password", 400));
  }
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return next(new ErrorHandler("Invalid email or password", 400));
  }
  const token = user.getJWTToken();
  res
    .status(200)
    .json({ success: true, user, token, message: "Login successful" });
});

// get User details
exports.getUserDetails = catchAsyncErrors(async (req, res, next) => {
  const user = await User.findById(req.user._id);
  if (!user) {
    return next(new ErrorHandler("Please login to access the resource", 404));
  }
  res.status(200).json({ success: true, user });
});

// logout user
exports.logoutUser = catchAsyncErrors(async (req, res, next) => {
  res.status(200).json({ success: true, message: "Logout successful" });
});

// update user details
exports.updateUserDetails = catchAsyncErrors(async (req, res, next) => {
  const newUserData = {
    name: req.body.name,
  };
  if (req.body.avatar !== "") {
    const user = await User.findById(req.user._id);
    const imageId = user.avatar.public_id;
    await cloudinary.v2.uploader.destroy(imageId);
    const myCloud = await cloudinary.v2.uploader.upload(req.body.avatar, {
      folder: "videoLibrary-avatars",
    });
    newUserData.avatar = {
      public_id: myCloud.public_id,
      url: myCloud.secure_url,
    };
  }
  const user = await User.findByIdAndUpdate(req.user._id, newUserData, {
    new: true,
    runValidators: true,
    userFindAndModify: false,
  });
  res.status(200).json({
    success: true,
    user,
    message: "User profile updated successfully",
  });
});

// delete user account
exports.deleteUserAccount = catchAsyncErrors(async (req, res, next) => {
  const user = await User.findById(req.user._id);
  if (!user) {
    return next(new ErrorHandler("Please login to access the resource", 404));
  }
  const imageId = user.avatar.public_id;
  //  await cloudinary.v2.uploader.destroy(imageId);
  await user.remove();
  res
    .status(200)
    .json({ success: true, message: "User account deleted successfully" });
});

// forgot user password
exports.forgotPassword = catchAsyncErrors(async (req, res, next) => {
  const user = await User.findOne({ email: req.body.email });

  if (!user) {
    return next(new ErrorHandler("User not found for the email", 404));
  }
  const resetToken = await user.getResetPasswordToken();
  await user.save({ validateBeforeSave: false });

  // const resetPasswordUrl = `${req.protocol}://${req.get('host')}/password/reset/${resetToken}`
  const resetPasswordUrl = `${process.env.FRONTEND_URL}/password/reset/${resetToken}`;
  const message = `You are receiving this email because you (or someone else) has requested the reset of a password.\n${resetPasswordUrl}\n\nIf you did not request this, please ignore this email and your password will remain unchanged.`;
  try {
    await sendMail({
      email: user.email,
      subject: "Video Library - Reset Password",
      message,
    });
    res.status(200).json({ success: true, message: "Email sent successfully" });
  } catch (error) {
    console.log("Mail can not be sent. Something went wrong");
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;
    await user.save({ validateBeforeSave: false });
    return next(
      new ErrorHandler("Email can not be sent. Something went wrong", 500)
    );
  }
});

// reset Password
exports.resetPassword = catchAsyncErrors(async (req, res, next) => {
  const resetPasswordToken = crypto
    .createHash("sha256")
    .update(req.params.token)
    .digest("hex");
  const user = await User.findOne({
    resetPasswordToken,
    resetPasswordExpire: { $gt: Date.now() },
  });
  if (!user) {
    return next(new ErrorHandler("Password reset token expired", 400));
  }
  if (req.body.password !== req.body.confirmPassword) {
    return next(new ErrorHandler("Passwords does not matche", 400));
  }
  user.password = req.body.password;
  user.resetPasswordToken = undefined;
  user.resetPasswordExpire = undefined;
  await user.save();
  res
    .status(200)
    .json({ success: true, message: "Password reset successfully" });
});

// add video to watchlater
exports.addWatchLater = catchAsyncErrors(async (req, res, next) => {
  const { videoId } = req.body;
  if (!req.user.watchLater.includes(videoId)) {
    req.user.watchLater.push(videoId);
  }
  await req.user.save();
  res.status(201).json({
    success: true,
    watchLaterList: req.user.watchLater,
    message: "Video added to watch later",
  });
});

// fetch watchlater
exports.getWatchLater = catchAsyncErrors(async (req, res, next) => {
  res.status(200).json({ success: true, watchLaterList: req.user.watchLater });
});

// remove video from watchlater
exports.removeWatchLater = catchAsyncErrors(async (req, res, next) => {
  const { videoId } = req.body;
  const index = req.user.watchLater.indexOf(videoId);
  if (index > -1) {
    req.user.watchLater.splice(index, 1);
  }
  await req.user.save();
  res.status(200).json({
    success: true,
    watchLaterList: req.user.watchLater,
    message: "Video removed from watch later",
  });
});

// add history
exports.addHistory = catchAsyncErrors(async (req, res, next) => {
  const { videoId } = req.body;
  if (!req.user.history.includes(videoId)) {
    req.user.history.unshift(videoId);
    if (req.user.history.length > 10) {
      req.user.history.splice(10, req.user.history.length - 10);
    }
  }
  await req.user.save();
  res.status(201).json({ success: true, historyList: req.user.history });
});

// fetch history
exports.getHistory = catchAsyncErrors(async (req, res, next) => {
  res.status(200).json({ success: true, historyList: req.user.history });
});

// remove video from history
exports.removeHistory = catchAsyncErrors(async (req, res, next) => {
  const { videoId } = req.body;
  const index = req.user.history.indexOf(videoId);
  if (index > -1) {
    req.user.history.splice(index, 1);
  }
  await req.user.save();
  res.status(200).json({ success: true, historyList: req.user.history });
});

// create playlist
exports.createPlaylist = catchAsyncErrors(async (req, res, next) => {
  const index = req.user.playlists.findIndex(
    (playlist) => playlist.name === req.body.name
  );
  if (index > -1) {
    return next(new ErrorHandler("Playlist already exists", 400));
  }
  const new_playlist = {
    name: req.body.name,
    videos: [],
  };
  req.user.playlists.push(new_playlist);
  await req.user.save();
  res.status(201).json({
    success: true,
    playlists: req.user.playlists,
    message: "New playlist created",
  });
});

// remove playlist
exports.removePlaylist = catchAsyncErrors(async (req, res, next) => {
  const playlist_name = req.body.name;
  const index = req.user.playlists.findIndex(
    (playlist) => playlist.name === playlist_name
  );
  if (index > -1) {
    req.user.playlists.splice(index, 1);
  }
  await req.user.save();
  res.status(200).json({
    success: true,
    playlists: req.user.playlists,
    message: "Playlist removed",
  });
});

// fetch all playlists
exports.getPlaylists = catchAsyncErrors(async (req, res, next) => {
  res.status(200).json({ success: true, playlists: req.user.playlists });
});

// add video to a playlist
exports.addVideoPlaylist = catchAsyncErrors(async (req, res, next) => {
  const { videoId, playlistName } = req.body;

  const index = req.user.playlists.findIndex(
    (playlist) => playlist.name === playlistName
  );
  if (index > -1) {
    if (!req.user.playlists[index].videos.includes(videoId)) {
      req.user.playlists[index].videos.push(videoId);
    }
  }
  await req.user.save();
  console.log(req.user.playlists[1].videos);
  console.log(req.user.playlists);
  res.status(201).json({
    success: true,
    playlists: req.user.playlists,
    message: `Video added to playlist ${playlistName}`,
  });
});

// remove video from a playlist
exports.removeVideoPlaylist = catchAsyncErrors(async (req, res, next) => {
  const { videoId, playlistName } = req.body;
  const index = req.user.playlists.findIndex(
    (playlist) => playlist.name === playlistName
  );
  if (index > -1) {
    const video_index = req.user.playlists[index].videos.indexOf(videoId);
    if (video_index > -1) {
      req.user.playlists[index].videos.splice(video_index, 1);
    }
  }
  await req.user.save();
  res.status(200).json({
    success: true,
    playlists: req.user.playlists,
    message: `Video removed from playlist ${playlistName}`,
  });
});
