import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import bodyParser from "body-parser";

// Import routes
import userRoutes from "./routes/userRoutes.js";
import paymentRoutes from "./routes/paymentRoutes.js";
import planRoutes from "./routes/planRoutes.js";
import paymentProcessRoutes from "./routes/paymentProcessRoutes.js";
import directPaymentRoutes from "./routes/directPaymentRoutes.js";

dotenv.config();
const app = express();

// Configure CORS
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(bodyParser.json());

// DB connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB Connected"))
  .catch(err => console.log(err));

// Public routes (no auth required)
app.use("/api/plans", planRoutes);
app.use("/api/direct-payment", directPaymentRoutes);

// Middleware to handle authentication
app.use((req, res, next) => {
  const publicPaths = [
    '/api/users/login',
    '/api/users/register',
    '/api/plans',
    '/api/direct-payment',
    '/api/payment/process'
  ];

  // Allow public paths without authentication
  if (publicPaths.some(path => req.path.startsWith(path))) {
    return next();
  }

  // Check authentication for non-public paths
  if (!req.headers.authorization) {
    return res.status(401).json({
      error: "Authentication required",
      redirectTo: "/login",
      returnTo: req.originalUrl
    });
  }
  next();
});

// Protected routes (require auth)
app.use("/api/users", userRoutes);
app.use("/api/payments", paymentRoutes);
app.use("/api/payment", paymentProcessRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
