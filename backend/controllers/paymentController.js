import Razorpay from "razorpay";
import Payment from "../models/Payment.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY,
  key_secret: process.env.RAZORPAY_SECRET
});

const authMiddleware = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) return res.status(401).json({ message: "No token, authorization denied" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    res.status(401).json({ message: "Token invalid" });
  }
};

export const createOrder = async (req, res) => {
  try {
    const { planId } = req.body;
    const plan = await Plan.findById(planId);
    
    if (!plan) {
      return res.status(404).json({ message: "Plan not found" });
    }

    // Create a pending payment record
    const validUntil = new Date();
    validUntil.setDate(validUntil.getDate() + plan.duration);

    const payment = await Payment.create({
      user: req.user.id,
      plan: planId,
      planName: plan.name,
      amount: plan.price,
      status: 'pending',
      validUntil
    });

    res.json({
      paymentLink: plan.paymentLink,
      payment: payment._id,
      plan
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const verifyPayment = async (req, res) => {
  try {
    const { paymentId, orderId, paymentStatus } = req.body;
    
    // Find the pending payment
    const payment = await Payment.findOne({ orderId });
    if (!payment) {
      return res.status(404).json({ message: "Payment not found" });
    }

    // Update payment status
    payment.paymentId = paymentId;
    payment.status = paymentStatus === 'success' ? 'success' : 'failed';
    await payment.save();

    if (payment.status === 'success') {
      // Update user's subscription
      const user = await User.findById(req.user.id);
      user.plan = payment.planName;
      user.activeSubscription = true;
      user.subscriptionEndDate = payment.validUntil;
      await user.save();
    }

    res.json({ 
      success: true, 
      message: payment.status === 'success' ? 
        "Payment successful! Your subscription is now active." : 
        "Payment failed. Please try again."
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getMyPayments = async (req, res) => {
  try {
    const payments = await Payment.find({ user: req.user.id });
    res.json(payments);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export { authMiddleware };
