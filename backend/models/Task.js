import mongoose from "mongoose";

const taskSchema = new mongoose.Schema({
  name: { type: String, required: true },
  assignee: { type: String, required: false },
  added: { type: Date },
  completed: { type: Date },
});

const Task = mongoose.model("Task", taskSchema);
export default Task;
