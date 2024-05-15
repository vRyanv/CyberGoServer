const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ChatSchema = new Schema(
  {
    members: [
      {
        type: Schema.ObjectId,
        ref: "User",
        required: true,
      },
    ],
    conversations: [
      {
        sender: {
          type: Schema.ObjectId,
          ref: "User",
          required: true,
        },
        send_time: { type: Date, required: true },
        content: { type: String, required: true },
      },
    ],
  },
  { timestamps: true }
);
module.exports = mongoose.model("Chat", ChatSchema);
