const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const userSch = new Schema({
    username: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, requried: true }
}, { timestamps: true });

module.exports = mongoose.model("User", userSch);