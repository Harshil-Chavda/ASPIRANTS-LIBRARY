import express from "express";
import { registerUser, loginUser } from "../controllers/userController.js";
import User from "../models/User.js";
import { authMiddleware } from "../controllers/paymentController.js";

const router = express.Router();

// Auth routes
router.post("/register", registerUser);
router.post("/login", loginUser);

// Protected routes
router.get("/profile", authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    
    const userData = {
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      ...(user.role === 'student' && {
        studentId: user.studentId,
        plan: user.plan,
        activeSubscription: user.activeSubscription,
        registrationDate: user.registrationDate.toISOString(),
        memberSince: user.memberSince || new Date().getFullYear()
      })
    };
    
    res.json(userData);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.put("/profile", authMiddleware, async (req, res) => {
  try {
    const { name, email } = req.body;
    const user = await User.findByIdAndUpdate(
      req.user.id,
      { $set: { name, email }},
      { new: true }
    ).select('-password');
    res.json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Admin only routes
router.get("/students", authMiddleware, async (req, res) => {
  try {
    if (req.user.role !== "admin") {
      return res.status(403).json({ message: "Access denied" });
    }
    const students = await User.find({ role: "student" }).select('-password');
    res.json(students);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
