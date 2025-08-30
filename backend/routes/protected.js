import express from "express";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/admin-data", protect, (req, res) => {
  res.json({ message: "You have access to admin data" });
});

export default router;
