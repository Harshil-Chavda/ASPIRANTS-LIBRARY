import express from 'express';
import { checkAuth as authMiddleware } from '../middleware/auth.js';
import Plan from '../models/Plan.js';
import Payment from '../models/Payment.js';
import User from '../models/User.js';

const router = express.Router();

// Handle direct payment processing
router.get('/process', async (req, res) => {
  try {
    const { planId, paymentLink } = req.query;

    // If user is not logged in, save plan info in session and redirect to payment
    if (!req.headers.authorization) {
      res.json({
        success: true,
        directPayment: true,
        paymentLink,
        message: "Redirecting to payment..."
      });
      return;
    }

    // If user is logged in, create payment record and redirect
    const plan = await Plan.findById(planId);
    if (!plan) {
      return res.status(404).json({ message: "Plan not found" });
    }

    // Create pending payment record
    const validUntil = new Date();
    validUntil.setDate(validUntil.getDate() + plan.duration);

    await Payment.create({
      user: req.user.id,
      plan: planId,
      planName: plan.name,
      amount: plan.price,
      status: 'pending',
      validUntil
    });

    res.json({
      success: true,
      directPayment: true,
      paymentLink,
      message: "Redirecting to payment..."
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Verify payment status
router.post('/verify', authMiddleware, async (req, res) => {
  try {
    const { paymentId, planId } = req.body;
    
    // Find the plan
    const plan = await Plan.findById(planId);
    if (!plan) {
      return res.status(404).json({ message: "Plan not found" });
    }

    // Create or update payment record
    const validUntil = new Date();
    validUntil.setDate(validUntil.getDate() + plan.duration);

    const payment = await Payment.findOneAndUpdate(
      { user: req.user.id, plan: planId, status: 'pending' },
      {
        paymentId,
        status: 'success',
        validUntil
      },
      { new: true, upsert: true }
    );

    // Update user's subscription
    await User.findByIdAndUpdate(req.user.id, {
      plan: plan.name,
      activeSubscription: true,
      subscriptionEndDate: validUntil
    });

    res.json({
      success: true,
      message: "Payment verified successfully",
      redirectUrl: "/dashboard"
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
