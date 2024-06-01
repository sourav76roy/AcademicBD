// boolean question model schema
const mongoose = require("mongoose");

const booleanQSchema = new mongoose.Schema(
  {
    question: {
      type: String,
      required: true,
    },
    options: {
      type: Array,
      required: true,
    },
    correctAns: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      required: true,
      default: "boolean",
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

const booleanQModel = mongoose.model("q-boolean", booleanQSchema);

module.exports = booleanQModel;
