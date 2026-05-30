import express from 'express';
import { authenticateToken } from '../middleware/auth.js';
import { 
  getCategories, 
  createCategory, 
  deleteCategory, 
  updateCategory 
} from '../controllers/categoriesController.js';

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Categories
 *   description: Керування категоріями товарів
 */

/**
 * @swagger
 * /api/categories:
 *   get:
 *     summary: Отримати список усіх категорій
 *     tags: [Categories]
 *     security: []
 *     responses:
 *       200:
 *         description: Масив категорій
 */
router.get('/', getCategories);

/**
 * @swagger
 * /api/categories:
 *   post:
 *     summary: Створити нову категорію
 *     tags: [Categories]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *     responses:
 *       201:
 *         description: Категорію створено
 */
router.post('/', authenticateToken, createCategory);

/**
 * @swagger
 * /api/categories/{id}:
 *   delete:
 *     summary: Видалити категорію за ID
 *     tags: [Categories]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Категорію видалено
 */
router.delete('/:id', authenticateToken, deleteCategory);

/**
 * @swagger
 * /api/categories/{id}:
 *   put:
 *     summary: Оновити назву категорії за ID
 *     tags: [Categories]
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
 *     responses:
 *       200:
 *         description: Категорію оновлено
 */

router.put('/:id', authenticateToken, updateCategory);

export default router;
