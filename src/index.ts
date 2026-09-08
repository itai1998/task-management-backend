import express, { Request, Response } from "express";

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

app.get("/", (req: Request, res: Response) => {
  res.send("Hello World test");
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
