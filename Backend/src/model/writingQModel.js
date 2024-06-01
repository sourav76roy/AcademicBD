// writing question schema and model
const mongoose = require("mongoose");

const writingQSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    groupId: {
      type: String,
      required: true,
    },
    bookId: {
      type: String,
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
      default: "writing",
    },
    createdOn: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

const writingQModel = mongoose.model("q-writing", writingQSchema);

module.exports = writingQModel;
