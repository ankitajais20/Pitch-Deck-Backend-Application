const express = require("express");
const bodyParser = require("body-parser");
const Investor = require("../model/investor");
const Entreprenuer = require("../model/entrepreneur");
const offerRouter = express.Router();
const {
  Types: { ObjectId },
} = require("mongoose");
offerRouter.use(bodyParser.json());

offerRouter.route("/:pitch_id/makeOffer").post(async (req, res) => {
  var pitchBody = req.body;
  if (
    pitchBody.investor === undefined ||
    pitchBody.investor === "" ||
    pitchBody.amount === undefined ||
    pitchBody.amount === "" ||
    pitchBody.equity === undefined ||
    pitchBody.equity === "" ||
    pitchBody.comment === undefined ||
    pitchBody.comment === ""
  ) {
    //console.log('Hello I am here');
    res.statusCode = 400;
    res.setHeader("Content-Type", "application/json");
    res.send({ "Response Code": 400 });
  } else {
    if (!ObjectId.isValid(req.params.pitch_id)) {
      res.send({ "Response Code": 404});
    } else {
      Investor.create(pitchBody)
        .then((offer) => {
          Entreprenuer.findById(req.params.pitch_id).then((pitch) => {
            pitch.offers.push(offer);
            pitch.save();
            res.statusCode = 201;
            res.send({ "id": offer._id.toString() });
          });
        })
        .catch((err) => {
          console.log(err, "err");
          res.send({ "Response Code": 404 });
        });
    }
  }
});

module.exports = offerRouter;
