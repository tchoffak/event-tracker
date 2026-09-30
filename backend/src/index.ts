import "dotenv/config";
import express from "express";
import { pool } from "./db";
import { authRouter } from "./routes/auth";

const app = express();
app.use(express.json());
app.use("/auth", authRouter);

app.get("/health", async (_req, res) => {
  try {
    await pool.query("SELECT 1");
    res.json({ status: "ok" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ status: "db unreachable" });
  }
});

const port = Number(process.env.PORT) || 3000;
app.listen(port, () => console.log(`API listening on ${port}`));