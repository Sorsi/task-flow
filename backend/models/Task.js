import mongoose from "mongoose";

const PriorityEnum = ["low", "medium", "high"];

const taskSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  assignee: { type: String, required: false },
  added: { type: Date, default: Date.now },
  dueDate: { type: Date },
  priority: {
    id: { type: Number, required: true },
    value: { type: String, enum: PriorityEnum, required: true },
  },
  completed: { type: Boolean },
});

const Task = mongoose.model("Task", taskSchema);
export default Task;
