const mongoose = require("mongoose");

const schema = new mongoose.Schema({
    Users: String
});

const model = mongoose.model("blacklist-user", schema);

module.exports = model;