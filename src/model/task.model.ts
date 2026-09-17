import { pool } from "../index";
import { Task } from "../types/task.types";

export const getAllTasksService = async () => {
  const result = await pool.query("SELECT * FROM tasks");
  return result.rows;
};

export const getTaskByIdService = async (id: string) => {
  const result = await pool.query("SELECT * FROM tasks WHERE task_id = $1", [
    id,
  ]);
  return result.rows[0];
};

export const createTaskService = async (task: Task) => {
  const result = await pool.query(
    `INSERT INTO tasks (task_no, title, description, note, status, priority)
     VALUES ($1, $2, $3, $4, $5, $6)
     RETURNING *`,
    [
      task.task_no,
      task.title,
      task.description,
      task.note,
      task.status,
      task.priority,
    ]
  );
  return result.rows[0];
};

export const updateTaskService = async (id: string, task: Task) => {
  const result = await pool.query(
    `UPDATE tasks
     SET task_no = $1, title = $2, description = $3, note = $4, status = $5, priority = $6
     WHERE task_id = $7
     RETURNING *`,
    [
      task.task_no,
      task.title,
      task.description,
      task.note,
      task.status,
      task.priority,
      id,
    ]
  );
  return result.rows[0];
};

export const deleteTaskService = async (id: string) => {
  const result = await pool.query(
    "DELETE FROM tasks WHERE task_id = $1 RETURNING *",
    [id]
  );
  return result.rows[0];
};
