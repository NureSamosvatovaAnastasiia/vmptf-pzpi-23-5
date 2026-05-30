import express from 'express';
import { authenticateToken } from '../middleware/auth.js';
import {
  getAllProducts,
  createProduct,
  updateProduct,
  deleteProduct
} from '../controllers/productsController.js';

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Products
 *   description: Керування товарами інтернет-магазину
 */

/**
 * @swagger
 * /api/products:
 *   get:
 *     summary: Отримати всі товари (з категоріями та відгуками)
 *     tags: [Products]
 *     security: []
 *     responses:
 *       200:
 *         description: Масив товарів
 */
router.get('/', getAllProducts);

/**
 * @swagger
 * /api/products:
 *   post:
 *     summary: Додати новий товар
 *     tags: [Products]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               description:
 *                 type: string
 *               price:
 *                 type: integer
 *               categoryId:
 *                 type: integer
 *     responses:
 *       201:
 *         description: Товар додано
 */
router.post('/', authenticateToken, createProduct);

/**
 * @swagger
 * /api/products/{id}:
 *   put:
 *     summary: Оновити дані товару
 *     tags: [Products]
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
 *               name:
 *                 type: string
 *               description:
 *                 type: string
 *               price:
 *                 type: integer
 *     responses:
 *       200:
 *         description: Товар оновлено
 */
router.put('/:id', authenticateToken, updateProduct);

/**
 * @swagger
 * /api/products/{id}:
 *   delete:
 *     summary: Видалити товар
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Товар видалено
 */
router.delete('/:id', authenticateToken, deleteProduct);

export default router;