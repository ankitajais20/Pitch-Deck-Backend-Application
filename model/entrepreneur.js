const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let entrepreneurSchema = new mongoose.Schema(
  {
    entrepreneur: {
      type: String,
      required: true,
    },
    pitchTitle: {
      type: String,
      required: true,
    },
    pitchIdea: {
      type: String,
      required: true,
    },
    askAmount: {
      type: Number,
      required: true,
    },
    equity: {
      type: Number,
      required: true,
    },
    offers: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Investor",
      },
    ],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Entreprenuer", entrepreneurSchema);
