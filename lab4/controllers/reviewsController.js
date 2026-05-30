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