import express from "express";
import { getPlans, getPlanById } from "../controllers/planController.js";
import User from "../models/User.js";
import { checkAuth } from "../middleware/auth.js";

const router = express.Router();

// Public routes - accessible without login
router.get("/", (req, res) => {
  try {
    const plans = [
      {
        id: "trial",
        name: "Trial Plan",
        price: 150,
        duration: 7,
        paymentLink: "https://rzp.io/rzp/QdjYHfEd",
        directPaymentUrl: "https://rzp.io/rzp/QdjYHfEd",
        features: ["7 days access", "Basic features", "Basic support"],
        buttonText: "Pay Now - ₹150",
        description: "Try before you buy",
        requiresLogin: false,
        directPayment: true
      },
      {
        id: "basic",
        name: "Basic Plan",
        price: 600,
        duration: 30,
        paymentLink: "https://rzp.io/rzp/5cuKcILz",
        directPaymentUrl: "https://rzp.io/rzp/5cuKcILz",
        features: ["Basic access", "Study materials", "Support"],
        buttonText: "Pay Now - ₹600",
        description: "Perfect for starters",
        requiresLogin: false,
        directPayment: true
      },
      {
        id: "standard",
        name: "Standard Plan",
        price: 700,
        duration: 30,
        paymentLink: "https://rzp.io/rzp/wIbMmS3Q",
        directPaymentUrl: "https://rzp.io/rzp/wIbMmS3Q",
        features: ["Full access", "All materials", "Priority support"],
        buttonText: "Pay Now - ₹700",
        description: "Most popular choice",
        requiresLogin: false,
        directPayment: true
      },
      {
        id: "premium",
        name: "Premium Plan",
        price: 1000,
        duration: 30,
        paymentLink: "https://rzp.io/rzp/t2a75L0B",
        directPaymentUrl: "https://rzp.io/rzp/t2a75L0B",
        features: ["Premium access", "All materials", "24/7 support"],
        buttonText: "Pay Now - ₹1000",
        description: "Complete package",
        requiresLogin: false,
        directPayment: true
      },
      {
        id: "quarterly-basic",
        name: "Quarterly Basic",
        price: 1100,
        duration: 90,
        paymentLink: "https://rzp.io/rzp/NmPCoVuE",
        directPaymentUrl: "https://rzp.io/rzp/NmPCoVuE",
        features: ["3 months access", "All basic features", "Email support"],
        buttonText: "Pay Now - ₹1100",
        description: "Long-term basic access",
        requiresLogin: false,
        directPayment: true
      },
      {
        id: "quarterly-premium",
        name: "Quarterly Premium",
        price: 1800,
        duration: 90,
        paymentLink: "https://rzp.io/rzp/NwlCcsD",
        directPaymentUrl: "https://rzp.io/rzp/NwlCcsD",
        features: ["3 months premium", "All features", "Priority support"],
        buttonText: "Pay Now - ₹1800",
        description: "Best value package",
        requiresLogin: false,
        directPayment: true
      }
    ];

    res.json({
      plans,
      noAuthRequired: true,
      directPayment: true
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get("/:id", getPlanById);

// Protected routes - require authentication
router.get("/user/current", checkAuth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('plan activeSubscription subscriptionEndDate');
    res.json({
      currentPlan: user.plan,
      isActive: user.activeSubscription,
      expiryDate: user.subscriptionEndDate
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
