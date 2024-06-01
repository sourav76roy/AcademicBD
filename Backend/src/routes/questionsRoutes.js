// Questions Lists routes

const express = require("express");
const {
  addQuestions,
  getBookQuestions,
  getMcqQById,
  updateMcqQ,
  deleteMcqQ,
} = require("../controller/questionsController");
// const { protect } = require("../middleware/authMiddleware");
const route = express.Router();

// make routes
// route.post("/create", protect, addMcqQ);
route.post("/create", addQuestions);
route.get("/", getBookQuestions);
route.get("/:id", getMcqQById);
route.put("/:id", updateMcqQ);
route.delete("/:id", deleteMcqQ);

module.exports = route;
