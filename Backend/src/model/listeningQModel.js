// writing question schema and model
const mongoose = require("mongoose");

const listeningQSchema = new mongoose.Schema(
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
    audio: {
      type: Object,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      default: "listening",
    },
    createdOn: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

const listeningQModel = mongoose.model("q-listening", listeningQSchema);

module.exports = listeningQModel;
