const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const guidSchema = new Schema({
    _id: String,
})


let Guild = mongoose.model('Guild', guidSchema);
module.exports = Guild;