import "dotenv/config";
import { Pool } from "pg";
import express, { Request, Response } from "express";
import taskRoutes from "./routes/task.routes";

export const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: Number(process.env.DB_PORT) || 5432,
});

const testConnection = async () => {
  try {
    const res = await pool.query("SELECT NOW()");
    console.log("✅ Connection successful!");
    console.log("PostgreSQL Server Time:", res.rows[0].now);
  } catch (error) {
    console.error("❌ Database connection failed:", error);
  }
};

testConnection();

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(taskRoutes);

app.listen(PORT, () => {
  console.log("Server is running on port 3000");
});
