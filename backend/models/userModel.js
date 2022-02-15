const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const Video = require("./videoModel");
const cloudinary = require("cloudinary");

// schema for user model
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please enter name"],
    maxlength: [30, "Name must be less than 30 characters"],
    minlength: [3, "Name must be at least 3 characters"],
    trim: true,
    unique: true,
  },
  email: {
    type: String,
    required: [true, "Please enter email"],
    trim: true,
    unique: true,
    validate: [validator.isEmail, "Please enter a valid email"],
  },
  password: {
    type: String,
    required: [true, "Please enter password"],
    minlength: [5, "Password must be at least 5 characters"],
    select: false,
  },
  avatar: {
    public_id: {
      type: String,
      required: true,
    },
    url: {
      type: String,
      required: true,
    },
  },
  watchLater: {
    type: Array,
    default: [],
  },
  history: {
    type: Array,
    default: [],
  },
  notifications: {
    type: Array,
    default: [],
  },
  subscribers: {
    type: Array,
    default: [],
  },
  playlists: {
    type: Array,
    default: [],
  },
  created_at: {
    type: Date,
    default: Date.now,
  },
  resetPasswordToken: String,
  resetPasswordExpire: Date,
});

// generating json web token
userSchema.methods.getJWTToken = function () {
  const user = this;
  const token = jwt.sign({ _id: user._id.toString() }, process.env.JWT_SECRET);
  return token;
};

// generating reset password token
userSchema.methods.getResetPasswordToken = function () {
  const user = this;
  const resetToken = crypto.randomBytes(20).toString("hex");
  user.resetPasswordToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");
  user.resetPasswordExpire = Date.now() + 15 * 60 * 1000;
  await user.save();
  return resetToken;
};

// hashing password
userSchema.pre("save", async function (next) {
  const user = this;
  if (!user.isModified(password)) {
    next();
  }
  user.password = await bcrypt.hash(user.password, 10);
});

// removing videos and stuff before deleting user
userSchema.pre("remove", async function (next) {
  const user = this;
  const videos = await Video.find({ owner: user._id });
  for (let video of videos) {
    const public_id = video.video.public_id;
    // await cloudinary.v2.uploader.destroy(public_id);
  }
  await Video.deleteMany({ owner: user._id });

  const all_videos = await Video.find();
  for (let video of all_videos) {
    const index = video.likes.indexOf(user._id);
    if (index > -1) {
      video.likes.splice(index, 1);
      await video.save();
    }
    const index2 = video.dislikes.indexOf(user._id);
    if (index2 > -1) {
      video.dislikes.splice(index2, 1);
      await video.save();
    }
  }

  next();
});

// user model
module.exports = mongoose.model("User", userSchema);
