// book model schema
const mongoose = require("mongoose");

const paymentSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  paymentType: {
    type: String,
    require: true,
  },
  amount: {
    type: Number,
    require: true,
  },
  tranId: {
    type: String,
    require: true,
  },
  status: {
    type: String,
    require: true,
    enum: ["pending", "successful", "error"],
  },
  validateTime: {
    startDate: {
      type: Date,
      require: true,
    },
    endDate: {
      type: Date,
      require: true,
    },
  },
});

//
const paymentModel = mongoose.model("payment", paymentSchema);

module.exports = paymentModel;
