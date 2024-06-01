// writing question schema and model
const mongoose = require("mongoose");

const speakingQSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      ref: "userModel",
      required: true,
    },
    groupId: {
      type: String,
      ref: "questionGroupModel",
      required: true,
    },
    bookId: {
      type: String,
      ref: "bookModel",
      required: true,
    },
    status: {
      type: String,
      default: "active",
    },
    title: {
      type: String,
      required: true,
    },
    image: {
      type: Object,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      default: "speaking",
    },
    createdOn: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

const speakingQModel = mongoose.model("q-speaking", speakingQSchema);

module.exports = speakingQModel;
