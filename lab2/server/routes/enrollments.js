import express from 'express';
import { eq } from 'drizzle-orm';

import { db } from '../db/index.js';
import * as schema from '../db/schema.js';
import { authenticateToken } from '../middleware/auth.js';

const router = express.Router();

router.post('/enroll', authenticateToken, async (req, res) => {
  try {
    const { courseId } = req.body;
    const userId = req.user.userId;

    if (!courseId) {
      return res.status(400).json({ error: "Необхідно вказати courseId" });
    }

    await db.insert(schema.enrollments).values({
      userId,
      courseId: parseInt(courseId, 10),
    }).onConflictDoNothing();

    res.json({ message: "Ви успішно записалися на курс!" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get('/users/me/courses', authenticateToken, async (req, res) => {
  try {
    const userId = req.user.userId;

    const myCourses = await db
      .select({
        id: schema.courses.id,
        title: schema.courses.title,
        description: schema.courses.description,
        author: schema.courses.author,
        price: schema.courses.price,
        progress: schema.enrollments.progress,
        enrolledAt: schema.enrollments.enrolledAt,
      })
      .from(schema.enrollments)
      .innerJoin(schema.courses, eq(schema.enrollments.courseId, schema.courses.id))
      .where(eq(schema.enrollments.userId, userId));

    res.json(myCourses);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;