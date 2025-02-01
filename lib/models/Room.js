import mongoose from "mongoose";

const RoomSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
    images: { type: [String], required: true }, // Array to store multiple images
    prices: {
      fullBoard: { type: Number, required: true },
      halfBoard: { type: Number, required: true },
      hourly: { type: Number, required: true },
    },
  },
  { timestamps: true }
);

export default mongoose.models.Room || mongoose.model("Room", RoomSchema);
