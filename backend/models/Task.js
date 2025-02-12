import mongoose from "mongoose";

const taskSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  assignee: { type: String, required: false },
  added: { type: Date, default: Date.now },
  dueDate: { type: Date },
  priority: { type: String },
  completed: { type: Boolean },
});

const Task = mongoose.model("Task", taskSchema);
export default Task;
