import express from 'express';
import { authenticateToken } from '../middleware/auth.js';
import { createReview } from '../controllers/reviewsController.js';

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

export default router;