import { db } from '../db/index.js';
import * as schema from '../db/schema.js';
import { eq } from 'drizzle-orm';

export const getCategories = async (req, res) => {
  try {
    const categories = await db.select().from(schema.categories);
    res.json(categories);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const createCategory = async (req, res) => {
  try {
    const { name } = req.body;
    const [newCategory] = await db.insert(schema.categories).values({ name }).returning();
    res.status(201).json(newCategory);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const deleteCategory = async (req, res) => {
  try {
    await db.delete(schema.categories).where(eq(schema.categories.id, parseInt(req.params.id)));
    res.json({ message: "Категорію видалено" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const updateCategory = async (req, res) => {
  try {
    const { name } = req.body;
    const [updatedCategory] = await db.update(schema.categories)
      .set({ name })
      .where(eq(schema.categories.id, parseInt(req.params.id)))
      .returning();
      
    if (!updatedCategory) {
      return res.status(404).json({ error: "Категорію не знайдено" });
    }
    
    res.json(updatedCategory);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};