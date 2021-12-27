const express = require("express");
const http = require("http");
const mongoose = require("mongoose");
const codeModel = require("./model/code");
const app = express();

app.use(express.json({ extended: false }));
app.use(express.urlencoded({ extended: true }));
const PORT = process.env.PORT || 4000;
const MONGO_URL =
  "mongodb+srv://yene:yene@cluster0.iwhrf.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
//
mongoose.connect(
  MONGO_URL,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  (error, database) => {
    if (error) {
      return console.log("error in connecting db ");
    }
    console.log("connected");
  }
);
// getting all data
app.get("/getallcode", async (req, res) => {
  const codes = await codeModel.find({});
  if (codes) {
    res.status(200).json(codes);
  } else {
    res.status(500).json({ messaage: "error in returning all codes" });
  }
});

// getting one code

app.get("/getcodepoint/:code", async (req, res) => {
  const code = req.params.code;
  const codeInfo = await codeModel.findOne({ code });
  if (codeInfo) {
    res.status(200).json(codeInfo);
  } else {
    res.status(500).json("error");
  }
});
// update points works

//
app.post("/checkcode", async (req, res) => {
  var form = req.body; //
  // check if it exists

  const code = form.code;

  const checkCode = await codeModel.findOne({ code });

  if (checkCode) {
    res.status(200).json(checkCode);
  } else {
    res.status(500).json({ message: "error" });
  }
});
// generate code by passing points

app.post("/generatecodewithpoint", async (req, res) => {
  var points = req.body;
  function getRandomString() {
    var randomChars = "abcdefghijklmnopqrstuvwxyz";
    var result = "";
    for (var i = 0; i < 5; i++) {
      result += randomChars.charAt(
        Math.floor(Math.random() * randomChars.length)
      );
    }
    return result;
  }

  var num = getRandomString();
  const code = codeModel.create({
    code: num,
    points: points.points,
  });

  res.status(200).json(code);
});
// initial generation
app.post("/generatecode", async (req, res) => {
  function getRandomString() {
    var randomChars = "abcdefghijklmnopqrstuvwxyz";
    var result = "";
    for (var i = 0; i < 5; i++) {
      result += randomChars.charAt(
        Math.floor(Math.random() * randomChars.length)
      );
    }
    return result;
  }

  var num = getRandomString();
  const code = codeModel.create({
    code: num,
    points: 1,
  });

  res.status(200).json(code);
});
// generate random number

const server = http.createServer(app).listen(PORT, () => {
  console.log("working");
});
