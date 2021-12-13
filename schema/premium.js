const mongoose = require("mongoose");

const schema = mongoose.Schema({
    User: String,
    Expire: Number,
    Permanent: Boolean
});

const model = mongoose.model("premium", schema);

module.exports = model;