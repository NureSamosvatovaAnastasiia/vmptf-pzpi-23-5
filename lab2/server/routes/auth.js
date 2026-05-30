import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import 'dotenv/config';

import { db } from '../db/index.js';
import * as schema from '../db/schema.js';
import { eq } from 'drizzle-orm';
import { authenticateToken } from '../middleware/auth.js';

const router = express.Router();
const JWT_SECRET = process.env.JWT_SECRET || 'fallback_secret_key';

router.post('/register', async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({ error: "Будь ласка, вкажіть ім'я користувача та пароль" });
    }
    const existingUsers = await db.select().from(schema.users).where(eq(schema.users.username, username)).limit(1);
    if (existingUsers.length > 0) {
      return res.status(400).json({ error: "Користувач з таким ім'ям вже зареєстрований" });
    }
    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(password, salt);
    const [newUser] = await db.insert(schema.users).values({
      username,
      passwordHash,
    }).returning({ id: schema.users.id, username: schema.users.username });

    res.status(201).json({ message: "Користувача успішно створено", user: newUser });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({ error: "Будь ласка, вкажіть ім'я користувача та пароль" });
    }

    const usersList = await db.select().from(schema.users).where(eq(schema.users.username, username)).limit(1);
    if (usersList.length === 0) {
      return res.status(400).json({ error: "Неправильне ім'я користувача або пароль" });
    }

    const user = usersList[0];

    const isValidPassword = await bcrypt.compare(password, user.passwordHash);
    if (!isValidPassword) {
      return res.status(400).json({ error: "Неправильне ім'я користувача або пароль" });
    }

    const token = jwt.sign(
      { userId: user.id, username: user.username },
      JWT_SECRET,
      { expiresIn: '24h' }
    );

    res.json({ token, user: { id: user.id, username: user.username } });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get('/me', authenticateToken, async (req, res) => {
  res.json({ user: req.user });
});

export default router;