const express = require("express");
const {
  paymentOder,
  paymentSuccess,
  paymentFail,
  paymentCancel,
  userPaymentHistory,
  allPaymentHistory,
} = require("../controller/paymentController");
const router = express.Router();

router.post("/oder", paymentOder);
router.post("/success/:tranId", paymentSuccess);
router.post("/fail/:tranId", paymentFail);
router.post("/cancel/:tranId", paymentCancel);

router.get("/user-payment-history/:userId", userPaymentHistory);
router.get("/payment-history", allPaymentHistory);

module.exports = router;
