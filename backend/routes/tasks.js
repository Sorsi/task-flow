import express from "express";
import Task from "../models/Task.js";

const router = express.Router();

// GET all tasks
router.get("/", async (req, res) => {
  try {
    const tasks = await Task.find();
    res.status(200).json(tasks);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error retrieving users");
  }
});

// GET task by ID
router.get("/:id", async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);
    if (!task) return res.status(404).send("Task not found");
    res.status(200).json(task);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error retrieving task");
  }
});

// POST create new task
router.post("/", async (req, res) => {
  try {
    const newUser = new Task(req.body);
    const savedUser = await newUser.save();
    res.status(201).json(savedUser);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error creating task");
  }
});

// PATCH update task
router.patch("/:id", async (req, res) => {
  try {
    const updatedUser = await Task.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!updatedUser) return res.status(404).send("Task not found");
    res.status(200).json(updatedUser);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error updating task");
  }
});

// DELETE task
router.delete("/:id", async (req, res) => {
  try {
    const deletedUser = await Task.findByIdAndDelete(req.params.id);
    if (!deletedUser) return res.status(404).send("Task not found");
    res.status(200).json({ message: "Task deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).send("Error deleting task");
  }
});

export default router;
