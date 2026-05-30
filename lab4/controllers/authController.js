import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { db } from '../db/index.js';
import * as schema from '../db/schema.js';
import { eq } from 'drizzle-orm';

const SECRET = process.env.JWT_SECRET || 'secret_key';

export const registerUser = async (req, res) => {
  try {
    const { username, password } = req.body;
    const hash = await bcrypt.hash(password, 10);
    const [user] = await db.insert(schema.users).values({ username, passwordHash: hash }).returning();
    res.status(201).json({ message: "Користувача створено", userId: user.id });
  } catch (e) {
    res.status(400).json({ error: "Помилка реєстрації. Можливо, ім'я вже зайняте." });
  }
};

export const loginUser = async (req, res) => {
  try {
    const { username, password } = req.body;
    const [user] = await db.select().from(schema.users).where(eq(schema.users.username, username));
    
    if (!user || !(await bcrypt.compare(password, user.passwordHash))) {
      return res.status(401).json({ error: "Невірний логін або пароль" });
    }

    const token = jwt.sign({ userId: user.id }, SECRET, { expiresIn: '24h' });
    res.json({ token, userId: user.id });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
};