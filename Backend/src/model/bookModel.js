// book model schema
const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "userModel",
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    testType: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    image: {
      type: Object,
      required: true,
    },
    status: {
      type: String,
      required: true,
      enum: ["active", "inactive"],
    },
    payment: {
      type: String,
      required: true,
    },
    createdOn: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

//
const bookModel = mongoose.model("book", bookSchema);

module.exports = bookModel;
