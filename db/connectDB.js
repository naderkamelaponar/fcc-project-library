/** بسم الله الرحمن الرحيم */
const mongoose = require("mongoose");
const connectDB = (uri) => {
  return mongoose.connect(uri);
};
module.exports = connectDB;
