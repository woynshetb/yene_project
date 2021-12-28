const mongoose = require("mongoose");
const CodeSchema = new mongoose.Schema({
  code: {
    type: String,
    ref: "Code",
  },
  points: {
    type: Number,
    ref: "Points",
  },
  status: {
    type: String,
    ref: "status",
  },
});

const Code = mongoose.model("Code", CodeSchema);

module.exports = Code;
