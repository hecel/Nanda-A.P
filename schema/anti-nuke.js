const mongoose = require("mongoose");

const schema = mongoose.Schema({
    Guild: String,
    Channel: String
});

const model = mongoose.model("antinuke", schema);

module.exports = model;