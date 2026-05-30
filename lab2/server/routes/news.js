import express from 'express';
import { sql } from 'drizzle-orm';

import { db } from '../db/index.js';
import * as schema from '../db/schema.js';

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const newsList = await db
      .select()
      .from(schema.news)
      .orderBy(sql`${schema.news.publishedAt} DESC`);
      
    res.json(newsList);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;