// question group Routes

const express = require("express");
const {
  questionGroupCreate,
  questionGroupList,
  questionGroupUpdate,
  questionGroupDelete,
} = require("../controller/questionGroupController");

const router = express.Router();

// question group create route
router.post("/create", questionGroupCreate);

// question group update route
router.put("/update/:id", questionGroupUpdate);

// question group list router (all the question groups of the book)
router.get("/:bookId", questionGroupList);

// question group delete route (delete question group by id)
router.delete("/:id", questionGroupDelete);

// export router
module.exports = router;
