import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ["student", "admin"], default: "student" },
  studentId: { type: String, unique: true, sparse: true },
  registrationDate: { type: Date, default: Date.now },
  memberSince: { type: Number, default: () => new Date().getFullYear() },
  plan: { type: String, enum: ["basic", "standard", "premium"], default: "basic" },
  activeSubscription: { type: Boolean, default: false },
  displayTitle: { type: String },
  displayName: { type: String },
  dashboardTitle: { type: String }
}, { timestamps: true });

export default mongoose.model("User", userSchema);
