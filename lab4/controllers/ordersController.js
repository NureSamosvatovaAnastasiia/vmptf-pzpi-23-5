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

export const updateOrderStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const [updatedOrder] = await db.update(schema.orders)
      .set({ status })
      .where(eq(schema.orders.id, parseInt(req.params.id)))
      .returning();
      
    res.json(updatedOrder);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const deleteOrder = async (req, res) => {
  try {
    await db.delete(schema.orders)
      .where(eq(schema.orders.id, parseInt(req.params.id)));
    res.json({ message: "Замовлення видалено" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const updateOrderItem = async (req, res) => {
  try {
    const { orderId, productId } = req.params;
    const { quantity } = req.body;
    
    const [updatedItem] = await db.update(schema.orderItems)
      .set({ quantity })
      .where(
        and(
          eq(schema.orderItems.orderId, parseInt(orderId)),
          eq(schema.orderItems.productId, parseInt(productId))
        )
      )
      .returning();
      
    res.json(updatedItem);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const deleteOrderItem = async (req, res) => {
  try {
    const { orderId, productId } = req.params;
    
    await db.delete(schema.orderItems)
      .where(
        and(
          eq(schema.orderItems.orderId, parseInt(orderId)),
          eq(schema.orderItems.productId, parseInt(productId))
        )
      );
      
    res.json({ message: "Товар видалено із замовлення" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};