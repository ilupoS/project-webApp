const mongoose = require('mongoose');


const Schema = mongoose.Schema;


let itemSchema = new Schema ({
    item: { type: String },
    updated: { type: Date, default: Date.now },
    user: mongoose.Types.ObjectId,
    username: { type: String }
});

module.exports = mongoose.model("Items", itemSchema);