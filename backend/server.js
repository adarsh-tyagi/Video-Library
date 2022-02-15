const app = require("./app");
const connectDB = require("./config/connectDB");
const cloudinary = require("cloudinary")

// config in development mode
if (process.env.NODE_ENV !== "PRODUCTION") {
  require("dotenv").config({ path: "backend/config/config.env" });
}

// cloudinary configurations
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
})

const port = process.env.PORT || 5000;

// connecting db and starting server
const start = async () => {
  connectDB(process.env.MONGO_URI);
  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
};

start();
