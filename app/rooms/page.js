"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";

export default function Rooms() {
  const [rooms, setRooms] = useState([]);

  // ✅ Fetch rooms from API
  useEffect(() => {
    async function fetchRooms() {
      const res = await fetch("/api/rooms");
      const data = await res.json();
      setRooms(data); // ✅ Store rooms from database
    }
    fetchRooms();
  }, []);

  return (
    <div className="container mx-auto px-6 py-20">
      <h2 className="text-4xl font-bold text-primary text-center">
        Available Rooms
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-10">
        {rooms.length > 0 ? (
          rooms.map((room) => (
            <div
              key={room._id}
              className="bg-white rounded-lg shadow-lg overflow-hidden"
            >
              {/* ✅ Fix: Show the first image if multiple images exist */}
              <Image
                src={
                  room.images?.length > 0 ? room.images[0] : "/default-room.jpg"
                }
                alt={room.name}
                width={400}
                height={250}
                className="w-full h-48 object-cover"
              />

              <div className="p-6">
                <h3 className="text-2xl font-bold text-primary">{room.name}</h3>

                {/* ✅ Display Pricing */}
                <p className="text-gray-600 mt-2">
                  <span className="font-semibold">Full Board:</span> $
                  {room.prices?.fullBoard}
                </p>
                <p className="text-gray-600">
                  <span className="font-semibold">Half Board:</span> $
                  {room.prices?.halfBoard}
                </p>
                <p className="text-gray-600">
                  <span className="font-semibold">Hourly:</span> $
                  {room.prices?.hourly}
                </p>

                {/* ✅ View Room Button */}
                <Link href={`/rooms/${room._id}`}>
                  <button className="mt-4 bg-secondary text-white px-4 py-2 rounded hover:bg-red-700 transition">
                    View Room
                  </button>
                </Link>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-600 col-span-3">
            No rooms available. Please check back later.
          </p>
        )}
      </div>
    </div>
  );
}
