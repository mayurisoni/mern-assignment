const mongoose = require("mongoose");

const technologySchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  technologyName: { type: String, required: true },
  Resources: [{ type: String, required: true }],
  status: { type: String, required: true },
  base64: { data: Buffer, contentType: String },
});

module.exports = mongoose.model("Technologies", technologySchema);
