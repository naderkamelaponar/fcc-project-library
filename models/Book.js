/** بسم الله الرحمن الرحيم */
const mongoose = require("mongoose");
const BookSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Book title is requiredd"],
      maxlength: 50,
    },
    comments: [{
      type: String,
      default: "",
      maxlength: 30,
    }],
    commentcount: {
      type: Number,
      default: 0
    }
  }
);
module.exports = mongoose.model("Book", BookSchema);