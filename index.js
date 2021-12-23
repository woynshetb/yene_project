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
// random code working
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
// get point information is done

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

app.put("/update", async (req, res) => {
  var form = req.body; //
  // check if it exists

  const code = form.code;
  const point = form.point;
  const codeUpdate = await codeModel.findOne({ code });
  console.log(codeUpdate["points"] + 1);
  if (codeUpdate) {
    const updatePoint = {
      $set: {
        points: codeUpdate["points"] + 1,
      },
    };
    var result = await codeUpdate.updateOne(updatePoint);
    console.log(result);

    res.status(200).json(result);
  } else {
    res.status(500).json({ message: "error" });
  }
});
// generate code by passing points

app.post("/generatecodefromUser", async (req, res) => {
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
    points: 0,
  });

  res.status(200).json(code);
});
// generate random number

const server = http.createServer(app).listen(PORT, () => {
  console.log("working");
});
