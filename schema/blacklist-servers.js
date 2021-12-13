const mongoose = require("mongoose");

const schema = new mongoose.Schema({
    Guild: String
});

const model = mongoose.model("blacklist-server", schema);

module.exports = model;