const mongoose = require("mongoose");

const adviceSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  slipId: Number,
  text: String,
  moodTag: String,
  rating: Number,
  userNote: String,
  dateSaved: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Advice", adviceSchema);
