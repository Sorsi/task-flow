import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  level: { type: String, required: false },
  tasks: { type: Array, required: false },
});

const User = mongoose.model("User", userSchema);
export default User;
