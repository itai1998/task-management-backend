import { Request, Response } from "express";
import {
  createTaskService,
  deleteTaskService,
  getAllTasksService,
  getTaskByIdService,
  updateTaskService,
} from "../model/task.model";

const handleRequest = (
  res: Response,
  status: number,
  message: string,
  data: unknown
) => {
  res.status(status).json({
    status,
    message,
    data,
  });
};

export const getAllTasksController = async (_req: Request, res: Response) => {
  try {
    const tasks = await getAllTasksService();
    return handleRequest(res, 200, "Tasks fetched successfully", tasks);
  } catch (error) {
    return handleRequest(res, 500, "Internal server error", error);
  }
};

export const getTaskByIdController = async (
  req: Request<{ id: string }>,
  res: Response
) => {
  try {
    const task = await getTaskByIdService(req.params.id);
    if (!task) {
      return handleRequest(res, 404, "Task not found", null);
    }
    return handleRequest(res, 200, "Task fetched successfully", task);
  } catch (error) {
    return handleRequest(res, 500, "Internal server error", error);
  }
};

export const createTaskController = async (req: Request, res: Response) => {
  try {
    const { task_no, title, description, note, status, priority } = req.body;
    const task = await createTaskService({
      task_no,
      title,
      description,
      note,
      status,
      priority,
    });
    return handleRequest(res, 201, "Task created successfully", task);
  } catch (error) {
    return handleRequest(res, 500, "Internal server error", error);
  }
};

export const updateTaskController = async (
  req: Request<{ id: string }>,
  res: Response
) => {
  try {
    const { task_no, title, description, note, status, priority } = req.body;
    const task = await updateTaskService(req.params.id, {
      task_no,
      title,
      description,
      note,
      status,
      priority,
    });
    if (!task) {
      return handleRequest(res, 404, "Task not found", null);
    }
    return handleRequest(res, 200, "Task updated successfully", task);
  } catch (error) {
    return handleRequest(res, 500, "Internal server error", error);
  }
};

export const deleteTaskController = async (
  req: Request<{ id: string }>,
  res: Response
) => {
  try {
    const task = await deleteTaskService(req.params.id);
    if (!task) {
      return handleRequest(res, 404, "Task not found", null);
    }
    return handleRequest(res, 200, "Task deleted successfully", task);
  } catch (error) {
    return handleRequest(res, 500, "Internal server error", error);
  }
};
