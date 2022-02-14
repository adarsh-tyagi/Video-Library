const mongoose = require("mongoose");

// schema for video model
const videoSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "Please enter title"],
    maxlength: [50, "Title must be less than 50 characters"],
  },
  description: {
    type: String,
    required: [true, "Please enter description"],
  },
  video: {
    public_id: {
      type: String,
      required: true,
    },
    url: {
      type: String,
      required: true,
    },
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    required: [true, "Please enter owner"],
    ref: "User",
  },
  likes: {
    type: Array,
    default: [],
  },
  dislikes: {
    type: Array,
    default: [],
  },
  created_at: {
    type: Date,
    default: Date.now,
  },
});

// video model
module.exports = mongoose.model("Video", videoSchema);
