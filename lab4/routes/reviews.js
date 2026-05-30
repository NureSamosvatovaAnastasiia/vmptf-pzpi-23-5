import express from 'express';
import { authenticateToken } from '../middleware/auth.js';
import { 
  createReview, 
  updateReview, 
  deleteReview 
} from '../controllers/reviewsController.js';

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Reviews
 *   description: Керування відгуками на товари
 */

/**
 * @swagger
 * /api/reviews:
 *   post:
 *     summary: Залишити відгук на товар
 *     tags: [Reviews]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               productId:
 *                 type: integer
 *               rating:
 *                 type: integer
 *               text:
 *                 type: string
 *     responses:
 *       201:
 *         description: Відгук успішно додано
 */
router.post('/', authenticateToken, createReview);

/**
 * @swagger
 * /api/reviews/{id}:
 *   put:
 *     summary: Оновити свій відгук
 *     tags: [Reviews]
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
 *               rating:
 *                 type: integer
 *               text:
 *                 type: string
 *     responses:
 *       200:
 *         description: Відгук оновлено
 */
router.put('/:id', authenticateToken, updateReview);

/**
 * @swagger
 * /api/reviews/{id}:
 *   delete:
 *     summary: Видалити відгук
 *     tags: [Reviews]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Відгук успішно видалено
 */
router.delete('/:id', authenticateToken, deleteReview);

export default router;