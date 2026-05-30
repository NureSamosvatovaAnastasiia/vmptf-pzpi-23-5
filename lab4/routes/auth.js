import express from 'express';
import { authenticateToken } from '../middleware/auth.js';
import { 
  registerUser, 
  loginUser, 
} from '../controllers/authController.js';
import { 
  updateUser, 
  deleteUser 
} from '../controllers/userController.js';

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Auth
 *   description: Реєстрація та авторизація
 */

/**
 * @swagger
 * /api/auth/register:
 *   post:
 *     summary: Реєстрація нового користувача
 *     tags: [Auth]
 *     security: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       201:
 *         description: Користувача успішно створено
 */
router.post('/register', registerUser);

/**
 * @swagger
 * /api/auth/login:
 *   post:
 *     summary: Вхід у систему (отримання JWT токена)
 *     tags: [Auth]
 *     security: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Успішний вхід, повертає токен
 */
router.post('/login', loginUser);


/**
 * @swagger
 * /api/auth/profile:
 *   put:
 *     summary: Оновити дані поточного користувача (ім'я або пароль)
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Дані користувача оновлено
 */
router.put('/profile', authenticateToken, updateUser);

/**
 * @swagger
 * /api/auth/profile:
 *   delete:
 *     summary: Видалити акаунт поточного користувача
 *     tags: [Auth]
 *     responses:
 *       200:
 *         description: Акаунт успішно видалено
 */
router.delete('/profile', authenticateToken, deleteUser);


export default router;