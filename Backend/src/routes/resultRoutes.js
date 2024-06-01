const express = require("express");
const router = express.Router();

const {
  addResult,
  getResults,
  getResultByUserId,
  getAllResultsMarking,
  updateResultMark,
} = require("../controller/resultController");

router.post("/add-result", addResult);
router.get("/get-results", getResults);
router.get("/get-result-by-userId/:userId", getResultByUserId);
router.get("/all-results-marking", getAllResultsMarking);
router.put("/update-result/:resultId", updateResultMark);

module.exports = router;
