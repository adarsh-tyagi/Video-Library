const mongoose = require("mongoose");

module.exports = (url) => {
  mongoose
    .connect(url, { useNewUrlParser: true, useUnifiedTopology: true })
    .then((data) => {
      console.log("Database connected successfully");
    })
    .catch((err) => {
      console.log("Something went wrong with database connection.");
      process.exit(1);
    });
};
