const express = require("express");
const bodyparser = require("body-parser");
const cors = require("cors");
const filUpload = require("express-fileupload");
const errorMiddleware = require("./middlewares/error");
const userRouter = require("./routes/userRoutes");
const videoRouter = require("./routes/videoRoutes");
const path = require("path")

// config in development mode
if (process.env.NODE_ENV !== "PRODUCTION") {
  require("dotenv").config({ path: "backend/config/config.env" });
}

// initialize app
const app = express();
app.use(express.json({ limit: "100mb" }));
app.use(bodyparser.urlencoded({ extended: true, limit: "100mb" }));
app.use(filUpload());
app.use(cors());

// routes
app.use("/api/v1/user", userRouter);
app.use("/api/v1/video", videoRouter);

app.use(express.static(path.join(__dirname, "../frontend/build")))
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../frontend/build/index.html"))
})

// error handling
app.use(errorMiddleware);

module.exports = app;
