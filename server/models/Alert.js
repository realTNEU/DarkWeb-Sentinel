import mongoose from "mongoose";

const AlertSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    identityType: {
      type: String,
      enum: ["email", "phone", "username"],
      required: true,
    },
    value: {
      type: String,
      required: true,
    },
    source: {
      type: String,
      required: true,
    },
    seen: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

// Prevent duplicates
AlertSchema.index(
  { userId: 1, identityType: 1, value: 1, source: 1 },
  { unique: true }
);

export default mongoose.model("Alert", AlertSchema);
