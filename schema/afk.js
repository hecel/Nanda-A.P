const mongoose = require("mongoose");

const schema = mongoose.Schema({
    Guild: String,
    Users: String,
    Afk: Boolean,
    Afk_reason: String
});

const model = mongoose.model("afk", schema);

module.exports = model;