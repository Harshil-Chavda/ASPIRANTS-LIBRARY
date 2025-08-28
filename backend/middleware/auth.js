import jwt from "jsonwebtoken";
import User from "../models/User.js";

// WARNING: Authentication has been removed from this middleware.
// This function will now always call next(), allowing access to all routes it's applied to.
export const checkAuth = async (req, res, next) => {
  console.warn("SECURITY ALERT: checkAuth is disabled. All requests will bypass authentication.");
  // Original logic for token verification is commented out.
  // try {
  //   const token = req.headers.authorization?.split(" ")[1];
  //   if (!token) {
  //     return res.status(401).json({ 
  //       error: "Authentication required",
  //       redirectTo: "/login",
  //       message: "Please login to continue"
  //     });
  //   }
  //   const decoded = jwt.verify(token, process.env.JWT_SECRET);
  //   req.user = decoded;
  //   next();
  // } catch (err) {
  //   res.status(401).json({ 
  //     error: "Invalid token",
  //     redirectTo: "/login",
  //     message: "Please login again"
  //   });
  // }

  // Temporarily bypass authentication:
  // In a real application, you would ensure authentication here.
  // For demonstration, we're setting a dummy user.
  // If you actually need a user object for subsequent middleware/routes,
  // consider what a 'default' or 'unauthenticated' user would look like.
  // For now, we'll proceed without setting req.user.
  next(); 
};

// WARNING: Subscription check has been removed from this middleware.
// This function will now always call next(), allowing access to all routes it's applied to.
export const checkSubscription = async (req, res, next) => {
  console.warn("SECURITY ALERT: checkSubscription is disabled. All requests will bypass subscription checks.");
  // Original logic for subscription check is commented out.
  // try {
  //   // If checkAuth is also disabled, req.user might not be set.
  //   // If you rely on req.user, you'll need to decide how to handle its absence.
  //   // For now, we're assuming you want to bypass this check entirely.
  //   // const user = await User.findById(req.user.id);
  //   // if (!user) {
  //   //   return res.status(404).json({ 
  //   //     error: "User not found",
  //   //     redirectTo: "/login",
  //   //     message: "Please login again"
  //   //   });
  //   // }

  //   // if (!user.activeSubscription) {
  //   //   return res.status(403).json({
  //   //     error: "Subscription required",
  //   //     redirectTo: "/plans",
  //   //     message: "Please select a subscription plan to continue",
  //   //     shouldShowPlans: true
  //   //   });
  //   // }
  //   next();
  // } catch (err) {
  //   res.status(500).json({ error: err.message });
  // }

  // Temporarily bypass subscription check:
  next();
};
