const mongoose = require("mongoose");

const PrefixSchema = mongoose.Schema({
    Guild: String,
    prefix: String
});
const model = mongoose.model("prefix", PrefixSchema);

module.exports = model;