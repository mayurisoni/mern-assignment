const mongoose = require("mongoose");

const taskSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  TaskName: { type: String, required: true },
  estimatedDuration: { type: Number, required: true },
  finalTime: { type: Number, required: true },
  comment: { type: String, required: true },
  developerName: { type: String, required: true },
  date: { type: String, required: true },
  status: { type: String, required: true },
  projectName: { type: String, required: true },
  projectId: { type: String, required: true },
});

module.exports = mongoose.model("Task", taskSchema);
