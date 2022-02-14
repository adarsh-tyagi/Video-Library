const app = require("./app");
const connectDB = require("./config/connectDB");

// config in development mode
if (process.env.NODE_ENV !== "PRODUCTION") {
  require("dotenv").config({ path: "backend/config/config.env" });
}

const port = process.env.PORT || 5000;

// connecting db and starting server
const start = async () => {
  connectDB(process.env.MONGO_URI);
  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
};

start();
