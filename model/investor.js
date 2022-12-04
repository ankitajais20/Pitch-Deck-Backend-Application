const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let investorSchema = new mongoose.Schema(
  {
    investor: {
      type: String,
      required: true,
    },
    amount: {
      type: Number,
      required: true,
    },
    equity: {
      type: Number,
      required: true,
    },
    comment: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Investor", investorSchema);
