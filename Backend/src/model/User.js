// Initialize mongoose schema
const mongoose = require("mongoose");

// User Schema
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
  },
  password: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  gender: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  intro: {
    type: String,
    required: true,
  },
  agreement: {
    type: Boolean,
    required: true,
  },
  role: {
    type: String,
    required: true,
    enum: ["user", "moderator", "admin"],
  },
  image: {
    type: Object,
    required: true,
  },
  payment: {
    type: Object,
    required: true,
  },
createdOn: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true });

const User = mongoose.model("User", userSchema);

module.exports = User;
