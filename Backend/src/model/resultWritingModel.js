// exam result model schema
const mongoose = require("mongoose");

const userWritingResultSchema = new mongoose.Schema(
  {
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
    examType: {
      type: String,
      required: true,
    },
    examId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
    answers: {
      type: Array,
      required: true,
    },
    status: {
      type: Object,
      required: true,
    },
    createdOn: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

const resultWritingModel = mongoose.model(
  "result-writing",
  userWritingResultSchema
);

module.exports = resultWritingModel;
