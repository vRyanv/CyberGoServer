const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const {MemberStatus} = require('../constant')
const MemberSchema = new Schema(
  {
    user: {
      type: Schema.ObjectId,
      ref: "User",
      required: true,
    },
    origin: {
      longitude: { type: Number, required: true },
      latitude: { type: Number, required: true },
      address: { type: String, required: true },
    },
    destination: {
      longitude: { type: Number, required: true },
      latitude: { type: Number, required: true },
      address: { type: String, required: true },
    },
    geometry: { type: String, required: true },
    status: { type: String, default: MemberStatus.QUEUE},
  },
  { timestamps: true }
);
module.exports = mongoose.model("Member", MemberSchema);
