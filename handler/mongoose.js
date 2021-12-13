const mongoose = require("mongoose");
const { mongooseConnectionString } = require("../botconfig/config.json");

if(!mongooseConnectionString) return;

mongoose.connect(mongooseConnectionString, {
    useUnifiedTopology: true,
    useNewUrlParser: true
}).then(() => {
    console.log("Connected to mongodb!");
});