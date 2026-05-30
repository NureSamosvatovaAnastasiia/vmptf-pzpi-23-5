import express from 'express';
import { authenticateToken } from '../middleware/auth.js';
import { createOrder, getMyOrders } from '../controllers/ordersController.js';

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Orders
 *   description: Оформлення та перегляд замовлень
 */

/**
 * @swagger
 * /api/orders:
 *   post:
 *     summary: Створити нове замовлення
 *     tags: [Orders]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               items:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     productId:
 *                       type: integer
 *                     quantity:
 *                       type: integer
 *     responses:
 *       201:
 *         description: Замовлення успішно створено
 */
router.post('/', authenticateToken, createOrder);

/**
 * @swagger
 * /api/orders/my:
 *   get:
 *     summary: Переглянути власні замовлення
 *     tags: [Orders]
 *     responses:
 *       200:
 *         description: Масив замовлень разом з товарами
 */
router.get('/my', authenticateToken, getMyOrders);

export default router;