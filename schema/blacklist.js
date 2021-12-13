const mongoose = require("mongoose");

const schema = mongoose.Schema({
    Guild: String,
    Users: String
});

const model = mongoose.model("blacklist", schema);
module.exports = model;