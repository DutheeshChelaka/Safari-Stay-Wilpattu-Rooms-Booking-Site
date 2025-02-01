import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import Room from "@/lib/models/Room";

export async function GET(req) {
  await connectDB();

  try {
    // ✅ Extract roomId from the request URL
    const url = new URL(req.url);
    const roomId = url.pathname.split("/").pop(); // Extracts roomId from URL

    if (!roomId) {
      return NextResponse.json(
        { message: "Room ID is required" },
        { status: 400 }
      );
    }

    const room = await Room.findById(roomId);
    if (!room) {
      return NextResponse.json({ message: "Room not found" }, { status: 404 });
    }

    return NextResponse.json(room);
  } catch (error) {
    console.error("Error fetching room details:", error);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}

export async function PUT(req, { params }) {
  await connectDB();

  try {
    const { roomId } = params; // Get room ID from URL params
    const { name, description, prices, images, coverImage } = await req.json();

    if (!roomId) {
      return NextResponse.json(
        { message: "Room ID is required!" },
        { status: 400 }
      );
    }

    if (!name || !description || !prices || !images || images.length === 0) {
      return NextResponse.json(
        { message: "Missing required fields!" },
        { status: 400 }
      );
    }

    const updatedRoom = await Room.findByIdAndUpdate(
      roomId,
      {
        name,
        description,
        images,
        coverImage,
        prices: {
          fullBoard: parseFloat(prices.fullBoard) || 0,
          halfBoard: parseFloat(prices.halfBoard) || 0,
          hourly: parseFloat(prices.hourly) || 0,
        },
      },
      { new: true }
    );

    if (!updatedRoom) {
      return NextResponse.json({ message: "Room not found!" }, { status: 404 });
    }

    return NextResponse.json({
      message: "Room updated successfully!",
      updatedRoom,
    });
  } catch (error) {
    console.error("Error updating room:", error);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}

// ✅ DELETE Room
export async function DELETE(req, context) {
  await connectDB();

  try {
    const { params } = await context; // ✅ Await params before using
    const roomId = params.roomId;

    if (!roomId) {
      return NextResponse.json(
        { message: "Room ID is required!" },
        { status: 400 }
      );
    }

    const deletedRoom = await Room.findByIdAndDelete(roomId);

    if (!deletedRoom) {
      return NextResponse.json({ message: "Room not found!" }, { status: 404 });
    }

    return NextResponse.json(
      { message: "Room deleted successfully!" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error deleting room:", error);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}
