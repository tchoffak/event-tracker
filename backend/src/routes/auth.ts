import { Router } from "express";
import bcrypt from "bcryptjs";
import { pool } from "../db";

export const authRouter = Router();

authRouter.post("/signup", async (req, res) => {
  const { name, email, password } = req.body ?? {};

  if (
    typeof name !== "string" || !name.trim() ||
    typeof email !== "string" || !/^\S+@\S+\.\S+$/.test(email) ||
    typeof password !== "string" || password.length < 8
  ) {
    return res
      .status(400)
      .json({ error: "name, a valid email, and a password of 8+ characters are required" });
  }

  try {
    const hash = await bcrypt.hash(password, 12);
    const result = await pool.query(
      `INSERT INTO users (name, email, password_hash)
       VALUES ($1, $2, $3)
       RETURNING id, name, email, created_at`,
      [name.trim(), email.toLowerCase(), hash]
    );
    res.status(201).json(result.rows[0]);
  } catch (err: any) {
    if (err.code === "23505") {
      return res.status(409).json({ error: "email already registered" });
    }
    console.error(err);
    res.status(500).json({ error: "server error" });
  }
});