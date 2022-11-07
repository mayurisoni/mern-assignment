const mongoose = require("mongoose");

const projectSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  projectName: { type: String, required: true },
  projectDescription: { type: String, required: true },
  startdate: { type:String, required: true },
  enddate: { type: String, required: true },
  Members: [{ type: String, required: true }],
  technology: [{ type: String, required: true }],
  status: { type: String, required: true },
  base64: { data: Buffer, contentType: String },
});

module.exports = mongoose.model("Project", projectSchema);
