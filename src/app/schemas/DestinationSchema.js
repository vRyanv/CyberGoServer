const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const DestinationSchema = new Schema({
  trip: {
    type: Schema.ObjectId,
    ref: "Trip",
    required: true,
  },
  geometry: { type: String, required: true },
  time: { type: Number, required: true },
  distance: { type: Number, required: true },
  city: { type: String, required: false },
  state: { type: String, required: false },
  county: { type: String, required: false },
  address: { type: String, required: true },
  longitude: { type: Number, required: true },
  latitude: { type: Number, required: true },
});
module.exports = mongoose.model("Destination", DestinationSchema);
