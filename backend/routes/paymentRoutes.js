import express from "express";
import { createOrder, verifyPayment, getMyPayments, authMiddleware } from "../controllers/paymentController.js";

const router = express.Router();

// Create a new payment order
router.post("/create-order", authMiddleware, createOrder);

// Verify payment after successful payment
router.post("/verify", authMiddleware, verifyPayment);

// Get user's payment history
router.get("/my", authMiddleware, getMyPayments);

export default router;
