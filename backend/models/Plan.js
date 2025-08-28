import mongoose from "mongoose";

const planSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  duration: {
    type: Number, // in days
    required: true
  },
  features: [{
    type: String
  }],
  description: String,
  paymentLink: {
    type: String,
    required: true
  }
}, { timestamps: true });

export default mongoose.model("Plan", planSchema);
