const express = require("express");
const bodyparser = require("body-parser");
const cors = require("cors");
const filUpload = require("express-fileupload");
const errorMiddleware = require("./middlewares/error");

// config in development mode
if (process.env.NODE_ENV !== "PRODUCTION") {
  require("dotenv").config({ path: "backend/config/config.env" });
}

// initialize app
const app = express();
app.use(express.json());
app.use(bodyparser.urlencoded({ extended: true }));
app.use(filUpload());
app.use(cors());

// routes
app.get("/", (req, res) => {
  res.send("This is video-library backend");
});

// error handling
app.use(errorMiddleware);

module.exports = app;
