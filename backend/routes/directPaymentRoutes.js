import express from 'express';
const router = express.Router();

// Direct payment links with fixed URLs
router.get('/', (req, res) => {
  const plans = [
    {
      id: 'trial',
      name: 'Trial Plan',
      price: 150,
      duration: '7 days',
      features: ['7 days access', 'Basic features', 'Basic support'],
      description: 'Try before you buy',
      paymentUrl: 'https://rzp.io/rzp/QdjYHfEd',
      buttonText: 'Pay ₹150',
      buttonAction: 'direct_payment'
    },
    {
      id: 'basic',
      name: 'Basic Plan',
      price: 600,
      duration: '1 month',
      features: ['Basic access', 'Study materials', 'Support'],
      description: 'Perfect for starters',
      paymentUrl: 'https://rzp.io/rzp/5cuKcILz',
      buttonText: 'Pay ₹600',
      buttonAction: 'direct_payment'
    },
    {
      id: 'standard',
      name: 'Standard Plan',
      price: 700,
      duration: '1 month',
      features: ['Full access', 'All materials', 'Priority support'],
      description: 'Most popular choice',
      paymentUrl: 'https://rzp.io/rzp/wIbMmS3Q',
      buttonText: 'Pay ₹700',
      buttonAction: 'direct_payment'
    },
    {
      id: 'premium',
      name: 'Premium Plan',
      price: 1000,
      duration: '1 month',
      features: ['Premium access', 'All materials', '24/7 support'],
      description: 'Complete package',
      paymentUrl: 'https://rzp.io/rzp/t2a75L0B',
      buttonText: 'Pay ₹1000',
      buttonAction: 'direct_payment'
    },
    {
      id: 'quarterly-basic',
      name: 'Quarterly Basic',
      price: 1100,
      duration: '3 months',
      features: ['3 months access', 'All basic features', 'Email support'],
      description: 'Long-term basic access',
      paymentUrl: 'https://rzp.io/rzp/NmPCoVuE',
      buttonText: 'Pay ₹1100',
      buttonAction: 'direct_payment'
    },
    {
      id: 'quarterly-premium',
      name: 'Quarterly Premium',
      price: 1800,
      duration: '3 months',
      features: ['3 months premium', 'All features', 'Priority support'],
      description: 'Best value package',
      paymentUrl: 'https://rzp.io/rzp/NwlCcsD',
      buttonText: 'Pay ₹1800',
      buttonAction: 'direct_payment'
    }
  ];

  res.json({
    plans,
    message: "Click on Pay button to proceed with payment directly"
  });
});

// Direct payment redirect
router.get('/:planId', (req, res) => {
  const planId = req.params.planId;
  const paymentLinks = {
    'trial': 'https://rzp.io/rzp/QdjYHfEd',
    'basic': 'https://rzp.io/rzp/5cuKcILz',
    'standard': 'https://rzp.io/rzp/wIbMmS3Q',
    'premium': 'https://rzp.io/rzp/t2a75L0B',
    'quarterly-basic': 'https://rzp.io/rzp/NmPCoVuE',
    'quarterly-premium': 'https://rzp.io/rzp/NwlCcsD'
  };

  const paymentLink = paymentLinks[planId];
  if (!paymentLink) {
    return res.status(404).json({ error: "Plan not found" });
  }

  res.json({ 
    redirectUrl: paymentLink,
    message: "Redirecting to payment..."
  });
});

export default router;
