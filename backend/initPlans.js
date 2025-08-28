import mongoose from "mongoose";
import Plan from "./models/Plan.js";
import dotenv from "dotenv";

dotenv.config();

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("Connected to MongoDB"))
  .catch(err => console.log(err));

const plans = [
  {
    name: "Basic Monthly",
    price: 600,
    duration: 30,
    paymentLink: "https://rzp.io/rzp/5cuKcILz",
    features: [
      "Basic study materials",
      "Limited access to resources",
      "Email support"
    ],
    description: "Perfect for beginners"
  },
  {
    name: "Standard Monthly",
    price: 700,
    duration: 30,
    paymentLink: "https://rzp.io/rzp/wIbMmS3Q",
    features: [
      "Full study materials",
      "Practice tests",
      "Priority support"
    ],
    description: "Most popular choice"
  },
  {
    name: "Premium Monthly",
    price: 1000,
    duration: 30,
    paymentLink: "https://rzp.io/rzp/t2a75L0B",
    features: [
      "All study materials",
      "Live sessions",
      "24/7 support"
    ],
    description: "Full access package"
  },
  {
    name: "Basic Quarterly",
    price: 1100,
    duration: 90,
    paymentLink: "https://rzp.io/rzp/NmPCoVuE",
    features: [
      "3 months access",
      "Basic study materials",
      "Email support"
    ],
    description: "Quarterly basic package"
  },
  {
    name: "Premium Quarterly",
    price: 1800,
    duration: 90,
    paymentLink: "https://rzp.io/rzp/NwlCcsD",
    features: [
      "3 months full access",
      "All premium features",
      "Priority support"
    ],
    description: "Best value package"
  },
  {
    name: "Trial Package",
    price: 150,
    duration: 7,
    paymentLink: "https://rzp.io/rzp/QdjYHfEd",
    features: [
      "7 days access",
      "Basic features",
      "Trial support"
    ],
    description: "Try before you buy"
  }
];

// Insert plans
const insertPlans = async () => {
  try {
    await Plan.deleteMany({}); // Clear existing plans
    await Plan.insertMany(plans);
    console.log("Plans inserted successfully");
  } catch (err) {
    console.error("Error inserting plans:", err);
  } finally {
    mongoose.connection.close();
  }
};

insertPlans();
