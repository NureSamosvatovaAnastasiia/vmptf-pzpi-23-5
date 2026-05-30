import { db } from '../db/index.js';
import * as schema from '../db/schema.js';
import { eq } from 'drizzle-orm';

export const createOrder = async (req, res) => {
  try {
    const userId = req.user.userId;
    const { items } = req.body;

    await db.transaction(async (tx) => {
      const [newOrder] = await tx.insert(schema.orders).values({ userId }).returning();
      
      const orderItemsData = items.map(item => ({
        orderId: newOrder.id,
        productId: item.productId,
        quantity: item.quantity || 1
      }));

      await tx.insert(schema.orderItems).values(orderItemsData);
    });

    res.status(201).json({ message: "Замовлення успішно створено" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getMyOrders = async (req, res) => {
  try {
    const myOrders = await db.query.orders.findMany({
      where: eq(schema.orders.userId, req.user.userId),
      with: {
        orderItems: {
          with: { product: true }
        }
      }
    });
    res.json(myOrders);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};