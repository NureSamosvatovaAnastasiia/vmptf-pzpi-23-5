import express from 'express';

import { db } from '../db/index.js';

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const allPrograms = await db.query.programs.findMany({
      with: {
        programCourses: {
          with: {
            course: true,
          },
        },
      },
    });

    const formattedPrograms = allPrograms.map((prog) => ({
      id: prog.id,
      title: prog.title,
      description: prog.description,
      courses: prog.programCourses
        .sort((a, b) => a.stepOrder - b.stepOrder)
        .map((pc) => pc.courseId),
    }));

    res.json(formattedPrograms);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;