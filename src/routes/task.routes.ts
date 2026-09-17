import express from "express";
import {
  createTaskController,
  deleteTaskController,
  getAllTasksController,
  getTaskByIdController,
  updateTaskController,
} from "../controllers/task.controller";

const router = express.Router();

router.get("/task", getAllTasksController);
router.get("/task/:id", getTaskByIdController);
router.post("/task", createTaskController);
router.put("/task/:id", updateTaskController);
router.delete("/task/:id", deleteTaskController);

export default router;
