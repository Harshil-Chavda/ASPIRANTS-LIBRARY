import jwt from "jsonwebtoken";
import User from "../models/User.js";

export const checkAuth = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
      return res.status(401).json({ 
        error: "Authentication required",
        redirectTo: "/login",
        message: "Please login to continue"
      });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    res.status(401).json({ 
      error: "Invalid token",
      redirectTo: "/login",
      message: "Please login again"
    });
  }
};

export const checkSubscription = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ 
        error: "User not found",
        redirectTo: "/login",
        message: "Please login again"
      });
    }

    if (!user.activeSubscription) {
      return res.status(403).json({
        error: "Subscription required",
        redirectTo: "/plans",
        message: "Please select a subscription plan to continue",
        shouldShowPlans: true
      });
    }
    
    next();
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
