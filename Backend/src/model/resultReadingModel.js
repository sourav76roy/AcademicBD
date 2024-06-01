// exam result model schema
const mongoose = require("mongoose");

const userResultSchema = new mongoose.Schema({
  wrongAnswers: {
    type: Number,
    required: true,
  },
  correctAnswers: {
    type: Number,
    required: true,
  },
  totalQuestions: {
    type: Number,
    required: true,
  },
  totalMarks: {
    type: Number,
    required: true,
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
  result: {
    type: Array,
    required: true,
  },
createdOn: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true });

const resultReadingModel = mongoose.model("result-reading", userResultSchema);

module.exports = resultReadingModel;
