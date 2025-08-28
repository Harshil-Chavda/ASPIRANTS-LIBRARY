import Plan from "../models/Plan.js";

export const getPlans = async (req, res) => {
  try {
    const plans = [
      {
        name: "Basic Plan",
        price: 600,
        duration: 30,
        paymentLink: "https://rzp.io/rzp/5cuKcILz",
        features: ["Basic access", "Study materials", "Support"],
        description: "Perfect for starters"
      },
      {
        name: "Standard Plan",
        price: 700,
        paymentLink: "https://rzp.io/rzp/wIbMmS3Q",
        duration: 30,
        features: ["Full access", "All materials", "Priority support"],
        description: "Most popular choice"
      },
      {
        name: "Premium Plan",
        price: 1000,
        paymentLink: "https://rzp.io/rzp/t2a75L0B",
        duration: 30,
        features: ["Premium access", "All materials", "24/7 support"],
        description: "Complete package"
      },
      {
        name: "Quarterly Basic",
        price: 1100,
        paymentLink: "https://rzp.io/rzp/NmPCoVuE",
        duration: 90,
        features: ["3 months access", "All basic features", "Email support"],
        description: "Long-term basic access"
      },
      {
        name: "Quarterly Premium",
        price: 1800,
        paymentLink: "https://rzp.io/rzp/NwlCcsD",
        duration: 90,
        features: ["3 months premium", "All features", "Priority support"],
        description: "Best value package"
      },
      {
        name: "Trial Plan",
        price: 150,
        paymentLink: "https://rzp.io/rzp/QdjYHfEd",
        duration: 7,
        features: ["7 days access", "Basic features", "Basic support"],
        description: "Try before you buy"
      }
    ];

    res.json(plans.map(plan => ({
      ...plan,
      buttonText: "Pay Now",
      directPayment: true,
      action: {
        type: 'DIRECT_PAYMENT',
        url: plan.paymentLink
      }
    })));
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getPlanById = async (req, res) => {
  try {
    const plan = await Plan.findById(req.params.id);
    if (!plan) {
      return res.status(404).json({ message: "Plan not found" });
    }
    res.json(plan);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
