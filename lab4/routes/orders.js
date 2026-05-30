import express from 'express';
import { authenticateToken } from '../middleware/auth.js';
import { 
  createOrder, 
  getMyOrders, 
  updateOrderStatus, 
  deleteOrder, 
  updateOrderItem, 
  deleteOrderItem 
} from '../controllers/ordersController.js';

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


/**
 * @swagger
 * /api/orders/{id}/status:
 *   put:
 *     summary: Змінити статус замовлення (для адмінів/менеджерів)
 *     tags: [Orders]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               status:
 *                 type: string
 *     responses:
 *       200:
 *         description: Статус оновлено
 */
router.put('/:id/status', authenticateToken, updateOrderStatus);

/**
 * @swagger
 * /api/orders/{id}:
 *   delete:
 *     summary: Видалити замовлення
 *     tags: [Orders]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Замовлення видалено
 */
router.delete('/:id', authenticateToken, deleteOrder);

/**
 * @swagger
 * /api/orders/{orderId}/items/{productId}:
 *   put:
 *     summary: Змінити кількість певного товару в замовленні
 *     tags: [Orders]
 *     parameters:
 *       - in: path
 *         name: orderId
 *         required: true
 *         schema:
 *           type: integer
 *       - in: path
 *         name: productId
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               quantity:
 *                 type: integer
 *     responses:
 *       200:
 *         description: Кількість товару оновлено
 */
router.put('/:orderId/items/:productId', authenticateToken, updateOrderItem);

/**
 * @swagger
 * /api/orders/{orderId}/items/{productId}:
 *   delete:
 *     summary: Видалити товар із замовлення
 *     tags: [Orders]
 *     parameters:
 *       - in: path
 *         name: orderId
 *         required: true
 *         schema:
 *           type: integer
 *       - in: path
 *         name: productId
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Товар видалено із замовлення
 */
router.delete('/:orderId/items/:productId', authenticateToken, deleteOrderItem);

export default router;