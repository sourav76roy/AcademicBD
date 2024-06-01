// fitg question model
const mongoose = require("mongoose");

const fitgQSchema = new mongoose.Schema(
  {
    question: {
      type: String,
      required: true,
    },
    correctAns: {
      type: Array,
      required: true,
    },
    type: {
      type: String,
      required: true,
      default: "fitg",
    },
    bookId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "bookModel",
      required: true,
    },
    groupId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "questionGroupModel",
      required: true,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "userModel",
      required: true,
    },
    status: {
      type: String,
      required: true,
      default: "active",
      enum: ["active", "inactive"],
    },
    createdOn: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

const fitgQModel = mongoose.model("q-fitg", fitgQSchema);

module.exports = fitgQModel;
