const mongoose = require('mongoose');


const Schema = mongoose.Schema;


let commentSchema = new Schema ({
    comment: { type: String },
    updated: { type: Date, default: Date.now },
    item: mongoose.Types.ObjectId,
    user: mongoose.Types.ObjectId,
    username: { type: String }
});

module.exports = mongoose.model("Comments", commentSchema);