var express = require("express");
var mongoose = require("mongoose");
var http = require("http");
var pitchRouter = require("./routes/pitchRouter");
var app = express();
var server = http.createServer(app);
var bodyParser = require("body-parser");
const offerRouter = require("./routes/offerRouter");

//connect to mongodb
const url = "mongodb://localhost:27017/xharktank";
//const url= 'mongodb+srv://ankitajais:myatlasserver@cluster0.uy61lr5.mongodb.net/?retryWrites=true&w=majority';
const connect = mongoose.connect(url, {
  useUnifiedTopology: true,
  useNewUrlParser: true,
});
connect.then(
  (db) => {
    console.log("Connected to database successfully!\n");
  },
  (err) => {
    console.log(err);
  }
);

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

var port = "8081";
app.set("port", port);
server.listen(port);
server.on("listening", onListening);

app.use("/pitches", pitchRouter);
app.use("/pitches", offerRouter);

app.get("/", (req, res) => {
  res.send("Hello dear");
});

function onListening() {
  var addr = server.address();
  console.log("Server listening on ", port);
}
