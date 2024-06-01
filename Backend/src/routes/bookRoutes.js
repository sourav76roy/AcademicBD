const express = require("express");
const {
  createBook,
  getBooks,
  updateBook,
  bookDelete,
} = require("../controller/bookController");
const router = express.Router();

// book route create
router.post("/create", createBook);

// book lists route get
router.get("/books/:role", getBooks);

// book route update
router.put("/:bookId", updateBook);

// book route delete
router.delete("/:bookId", bookDelete);

// export book routes
module.exports = router;
