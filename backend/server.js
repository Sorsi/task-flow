import "./loadEnvironment.js";
import express from "express";
import cors from "cors";
import connectDB from "./db/connection.js";
import usersRouter from "./routes/users.js";
import tasksRouter from "./routes/tasks.js";

const PORT = process.env.PORT || 5050;
const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Connect to database
connectDB();

// API routes
app.use("/users", usersRouter);
app.use("/tasks", tasksRouter);

// Base test endpoint
app.get("/", (req, res) => {
  res.send("Hello, MongoDB with Mongoose!");
});

// Start server
app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
});
