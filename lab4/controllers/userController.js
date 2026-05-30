export const updateUser = async (req, res) => {
  try {
    const { username, password } = req.body;
    const userId = req.user.userId;

    let updateData = {};
    if (username) updateData.username = username;
    if (password) {
      updateData.passwordHash = await bcrypt.hash(password, 10);
    }

    if (Object.keys(updateData).length === 0) {
      return res.status(400).json({ error: "Немає даних для оновлення" });
    }

    const [updatedUser] = await db.update(schema.users)
      .set(updateData)
      .where(eq(schema.users.id, userId))
      .returning();

    res.json({ message: "Дані користувача оновлено", user: updatedUser });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
};

export const deleteUser = async (req, res) => {
  try {
    const userId = req.user.userId;
    await db.delete(schema.users).where(eq(schema.users.id, userId));
    res.json({ message: "Акаунт користувача успішно видалено" });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
};