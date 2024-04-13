const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const TripSchema = new Schema(
  {
    trip_owner: {
      type: Schema.ObjectId,
      ref: "User",
      required: true,
    },
    members: [
      {
        user: {
          type: Schema.ObjectId,
          ref: "User",
          required: true,
        },
        trip: {
          origin: {
            longitude: { type: Number, required: true },
            latitude: { type: Number, required: true },
            address: { type: String, required: false },
          },
          destination: {
            longitude: { type: Number, required: true },
            latitude: { type: Number, required: true },
            address: { type: String, required: false },
          },
        },
        status: { type: String, required: true },
      },
    ],
    origin_city: { type: String, required: false },
    origin_state: { type: String, required: false },
    origin_county: { type: String, required: false },
    origin_address: { type: String, required: false },
    destination_type: { type: String, required: false },
    vehicle: {
      type: Schema.ObjectId,
      ref: "Vehicle",
      required: true,
    },
    start_date_time: { type: Date, required: true },
    price: { type: Number, required: true },
    description: { type: String, required: false },
  },
  { timestamps: true }
);
module.exports = mongoose.model("Trip", TripSchema);
