import mongoose from "mongoose";

const paymentSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  plan: { type: mongoose.Schema.Types.ObjectId, ref: "Plan", required: true },
  planName: { type: String, required: true },
  amount: { type: Number, required: true },
  paymentId: { type: String, required: true },
  orderId: { type: String },
  status: { type: String, enum: ["pending", "success", "failed"], default: "pending" },
  validUntil: { type: Date, required: true }
}, { timestamps: true });

export default mongoose.model("Payment", paymentSchema);
