import { db } from '../db/index.js';
import * as schema from '../db/schema.js';
import { eq } from 'drizzle-orm';

export const getAllProducts = async (req, res) => {
  try {
    const products = await db.query.products.findMany({
      with: {
        category: true,
        reviews: { with: { user: { columns: { username: true } } } }
      }
    });
    res.json(products);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const createProduct = async (req, res) => {
  try {
    const { name, description, price, categoryId } = req.body;
    const [newProduct] = await db.insert(schema.products)
      .values({ name, description, price, categoryId })
      .returning();
    res.status(201).json(newProduct);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const updateProduct = async (req, res) => {
  try {
    const { name, description, price } = req.body;
    const [updated] = await db.update(schema.products)
      .set({ name, description, price })
      .where(eq(schema.products.id, parseInt(req.params.id)))
      .returning();
    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const deleteProduct = async (req, res) => {
  try {
    await db.delete(schema.products).where(eq(schema.products.id, parseInt(req.params.id)));
    res.json({ message: "Товар видалено" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};