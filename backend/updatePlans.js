import mongoose from "mongoose";
import dotenv from "dotenv";
import Plan from "./models/Plan.js";

dotenv.config();

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("Connected to MongoDB"))
  .catch(err => console.log(err));

const plansData = [
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

const initializePlans = async () => {
  try {
    // Clear existing plans
    await Plan.deleteMany({});
    console.log("Cleared existing plans");

    // Insert new plans
    await Plan.insertMany(plansData);
    console.log("Successfully inserted new plans");
  } catch (error) {
    console.error("Error:", error);
  } finally {
    mongoose.connection.close();
  }
};

initializePlans();
