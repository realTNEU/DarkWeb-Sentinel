import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    minLength: 3,
    maxLength: 30,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
  },
  phone: {
    type: String,
    default: null,
  },
  password: {
    type: String,
    required: true,
    minLength: 6,
  },
}, { timestamps: true });

export default mongoose.model("User", UserSchema);
