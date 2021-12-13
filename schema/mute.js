const { Schema, model } = require("mongoose");

const schema = new Schema({
    Guild: String,
    Users: Array
});

const mdel = model("muted-members", schema);
module.exports= mdel;