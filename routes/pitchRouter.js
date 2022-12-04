const express = require("express");
const bodyParser = require("body-parser");
const Entreprenuer = require("../model/entrepreneur");
const Investor = require("../model/investor");
const pitchRouter = express.Router();

pitchRouter
  .route("/")
  .get(async (req, res) => {
    try {
      var finalList = [];
      Entreprenuer.find({})
        .sort({ updatedAt: -1 })
        .then((allpitches) => {
          if(allpitches.length===0){
            //console.log(allpitches);
            res.statusCode = 200;
            res.status(200).json(allpitches);
          }
          else {
            //console.log(allpitches);
          return allpitches.forEach(pitch => { 
            var myObj = {}; 
            pitch.populate("offers" , ['id', 'investor' , 'amount' , 'equity' , 'comment']).then((pitches1) => {
              myObj.id = pitch._id;
              myObj.entrepreneur = pitch.entrepreneur;
              myObj.pitchTitle = pitch.pitchTitle;
              myObj.pitchIdea = pitch.pitchIdea;
              myObj.askAmount = pitch.askAmount;
              myObj.equity = pitch.equity;
              myObj.offers = [];
      
              pitches1.offers.forEach(element => {
                  var temp = {};
                  temp.id = element._id;
                  temp.investor = element.investor;
                  temp.amount = element.amount;
                  temp.equity = element.equity;
                  temp.comment = element.comment;
                  myObj.offers.push(temp);
                  //console.log(temp);
              })
              //console.log(myObj);
              finalList.push(myObj);
              //console.log(finalList);
            }); 
            //console.log(myObj);
            //console.log(finalList);
          })
          //res.statusCode = 200;
          //res.status(200).json(finalList);
        } 
        })
        .then(()=>{
          res.statusCode = 200;
          res.status(200).json(finalList);
          //console.log(obj,"obj");
          //console.log(finalList,"finallist obj");
        })
    } catch (e) {
      console.log(e);
      res.statusCode = 400;
      res.send({ "Response Code": 400 });
    }
  })

  .post(async (req, res) => {
    var pitchBody = req.body;
    //console.log('here');
    //console.log(pitchBody.entrepreneur);
    if (
      pitchBody.entrepreneur === undefined ||
      pitchBody.entrepreneur === "" ||
      pitchBody.pitchTitle === undefined ||
      pitchBody.pitchTitle === "" ||
      pitchBody.pitchIdea === undefined ||
      pitchBody.pitchIdea === "" ||
      pitchBody.askAmount === undefined ||
      pitchBody.askAmount === "" ||
      pitchBody.equity === undefined ||
      pitchBody.equity === "" ||
      pitchBody.equity > 100 ||
      pitchBody.equity < 0
    ) {
      res.statusCode = 400;
      res.send({ "Response Code": 400 });
    } else {
      Entreprenuer.create(req.body)
        .then((pitch) => {
          res.statusCode = 201;
          res.send({ "id": pitch._id.toString() });
        })
        .catch((err) => {
          console.log(err);
          res.statusCode = 400;
          res.send({ "Response Code": 400 });
        });
    }
  });

pitchRouter.route("/:pitch_id").get((req, res, next) => {
  const pitch_id = req.params.pitch_id;
  var myObj = {};
  Entreprenuer.findOne({ _id: pitch_id })
    .then((pitch) => {
      pitch.populate("offers" , ['id', 'investor' , 'amount' , 'equity' , 'comment']).then((pitches) => {
        myObj.id = pitch._id;
        myObj.entrepreneur = pitch.entrepreneur;
        myObj.pitchTitle = pitch.pitchTitle;
        myObj.pitchIdea = pitch.pitchIdea;
        myObj.askAmount = pitch.askAmount;
        myObj.equity = pitch.equity;
        myObj.offers = [];

        pitches.offers.forEach(element => {
            var temp = {};
            temp.id = element._id;
            temp.investor = element.investor;
            temp.amount = element.amount;
            temp.equity = element.equity;
            temp.comment = element.comment;
            myObj.offers.push(temp);
        })

        res.statusCode = 200;
        res.status(200).json(myObj);
        //console.log(myObj);
      });
    })
    .catch((err) => {
      console.log(err);
      res.statusCode = 404;
      res.send({ "Response Code": 404 });
    });
});

module.exports = pitchRouter;
