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
export async function POST(req) {
  try {
    await connectDB();
    const { name, description, prices, images } = await req.json();

    if (!name || !description || !prices || !images || images.length === 0) {
      return NextResponse.json(
        { message: "All fields are required" },
        { status: 400 }
      );
    }

    const newRoom = new Room({ name, description, prices, images });
    await newRoom.save();

    return NextResponse.json(
      { message: "Room added successfully!" },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Error adding room", error },
      { status: 500 }
    );
  }
}

// 🔹 Delete a Room - Admin Only
export async function DELETE(req) {
  try {
    await connectDB();
    const { id } = await req.json();

    if (!id) {
      return NextResponse.json(
        { message: "Room ID is required" },
        { status: 400 }
      );
    }

    const deletedRoom = await Room.findByIdAndDelete(id);
    if (!deletedRoom) {
      return NextResponse.json({ message: "Room not found" }, { status: 404 });
    }

    return NextResponse.json({ message: "Room deleted successfully!" });
  } catch (error) {
    return NextResponse.json(
      { message: "Error deleting room", error },
      { status: 500 }
    );
  }
}
