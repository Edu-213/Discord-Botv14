const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let warningSchema = new Schema({
  guild: {type: String,},
  user: {type: String},
  warnings: {type: Array, default: []}
});

let warnModel = mongoose.model("warnModel", warningSchema);
module.exports = warnModel;