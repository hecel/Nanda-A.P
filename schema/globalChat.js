const mongoose = require("mongoose");

const schema = new mongoose.Schema({
    Guild: String,
    Channel: String,
    Author: String,
    Activated: Boolean
});

const model = mongoose.model("channel", schema);

module.exports = model;