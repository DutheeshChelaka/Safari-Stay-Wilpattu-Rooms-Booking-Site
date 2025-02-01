import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import Room from "@/lib/models/Room";

// 🔹 Get All Rooms
export async function GET() {
  try {
    await connectDB();
    const rooms = await Room.find({});
    return NextResponse.json(rooms);
  } catch (error) {
    return NextResponse.json(
      { message: "Error fetching rooms", error },
      { status: 500 }
    );
  }
}

// 🔹 Add a New Room (Admin Only) - JSON Request Only
// ✅ Fix: Ensure prices are properly extracted and converted
export async function POST(req) {
  await connectDB();
  const { name, description, prices, images } = await req.json();

  if (!Array.isArray(images)) {
    return NextResponse.json(
      { message: "Images must be an array" },
      { status: 400 }
    );
  }

  try {
    const newRoom = new Room({
      name,
      description,
      prices,
      images, // ✅ Save multiple images properly
    });

    await newRoom.save();

    return NextResponse.json(
      { message: "Room added successfully!", room: newRoom },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error adding room:", error);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}
