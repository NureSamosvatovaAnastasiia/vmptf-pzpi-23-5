import express from 'express';
import { eq, sql } from 'drizzle-orm';

import { db } from '../db/index.js';
import * as schema from '../db/schema.js';
import { authenticateToken } from '../middleware/auth.js';

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const coursesWithRating = await db
      .select({
        id: schema.courses.id,
        title: schema.courses.title,
        description: schema.courses.description,
        author: schema.courses.author,
        price: schema.courses.price,
        rating: sql`COALESCE(ROUND(AVG(${schema.reviews.rating}), 1), 0)`.mapWith(Number),
      })
      .from(schema.courses)
      .leftJoin(schema.reviews, eq(schema.courses.id, schema.reviews.courseId))
      .groupBy(schema.courses.id)
      .orderBy(schema.courses.id);

    res.json(coursesWithRating);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const courseId = parseInt(id, 10);

    const [course] = await db.select().from(schema.courses).where(eq(schema.courses.id, courseId)).limit(1);
    if (!course) {
      return res.status(404).json({ error: "Курс з таким ідентифікатором не знайдено" });
    }

    res.json(course);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get('/:id/reviews', async (req, res) => {
  try {
    const { id } = req.params;
    const courseId = parseInt(id, 10);

    const courseReviews = await db
      .select({
        id: schema.reviews.id,
        rating: schema.reviews.rating,
        text: schema.reviews.text,
        createdAt: schema.reviews.createdAt,
        user: schema.users.username,
      })
      .from(schema.reviews)
      .innerJoin(schema.users, eq(schema.reviews.userId, schema.users.id))
      .where(eq(schema.reviews.courseId, courseId))
      .orderBy(sql`${schema.reviews.createdAt} DESC`);

    res.json(courseReviews);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post('/reviews', authenticateToken, async (req, res) => {
  try {
    const { courseId, rating, text } = req.body;
    const userId = req.user.userId;

    const parsedCourseId = parseInt(courseId, 10);
    const parsedRating = parseInt(rating, 10);

    if (!courseId || !rating) {
      return res.status(400).json({ error: "Поля courseId та rating є обов'язковими" });
    }

    if (parsedRating < 1 || parsedRating > 5) {
      return res.status(400).json({ error: "Рейтинг має бути цілим числом від 1 до 5" });
    }

    const [newReview] = await db.insert(schema.reviews).values({
      courseId: parsedCourseId,
      userId,
      rating: parsedRating,
      text,
    }).returning();

    res.status(201).json(newReview);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;