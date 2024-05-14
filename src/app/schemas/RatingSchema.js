const { Timestamp } = require('firebase-admin/firestore');
const mongoose = require('mongoose')
const Schema = mongoose.Schema
const RatingSchema = new Schema({
  user_send: {
    type: Schema.ObjectId,
    ref: "User",
    required: true,
  },
  user_receive: {
    type: Schema.ObjectId,
    ref: "User",
    required: true,
  },
  star: { type: Number, required: true},
  comment: {type:String, default: " "}
}, { timestamps: true })
module.exports = mongoose.model("Rating", RatingSchema);