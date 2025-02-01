import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    phone: { type: String, required: true, unique: true },
    role: { type: String, default: "user" }, // Default role is "user", admins must be manually updated
  },
  { timestamps: true }
);

export default mongoose.models.User || mongoose.model("User", UserSchema);
