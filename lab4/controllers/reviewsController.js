import { db } from '../db/index.js';
import * as schema from '../db/schema.js';

export const createReview = async (req, res) => {
  try {
    const userId = req.user.userId;
    const { productId, rating, text } = req.body;

    const [newReview] = await db.insert(schema.reviews)
      .values({ productId, userId, rating, text })
      .returning();
      
    res.status(201).json(newReview);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const updateReview = async (req, res) => {
  try {
    const { rating, text } = req.body;
    const [updatedReview] = await db.update(schema.reviews)
      .set({ rating, text })
      .where(eq(schema.reviews.id, parseInt(req.params.id)))
      .returning();
      
    res.json(updatedReview);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const deleteReview = async (req, res) => {
  try {
    await db.delete(schema.reviews)
      .where(eq(schema.reviews.id, parseInt(req.params.id)));
    res.json({ message: "Відгук успішно видалено" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};