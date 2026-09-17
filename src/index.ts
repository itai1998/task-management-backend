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

interface Product {
  id: number;
  name: string;
}

const products: Product[] = [
  { id: 1, name: "Product 1" },
  { id: 2, name: "Product 2" },
  { id: 3, name: "Product 3" },
];

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(taskRoutes);

app.get("/", async (req: Request, res: Response) => {
  try {
    const result = await pool.query("SELECT * FROM tasks");
    res.json(result.rows);
  } catch (error) {
    console.error("❌ Error fetching tasks:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

app.get("/about", (req: Request, res: Response) => {
  res.send("About page");
});

app.get("/products", (req: Request, res: Response) => {
  res.json(products);
});

app.get("/products/:id", (req: Request<{ id: string }>, res: Response) => {
  const id = parseInt(req.params.id);
  const product = products.find((p) => p.id === id);
  if (!product) {
    return res.status(404).json({ message: "Product not found" });
  }
  res.json(product);
});

app.listen(PORT, () => {
  console.log("Server is running on port 3000");
});
