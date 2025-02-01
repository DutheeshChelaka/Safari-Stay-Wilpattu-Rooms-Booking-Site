"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";

export default function Rooms() {
  const [rooms, setRooms] = useState([]);

  useEffect(() => {
    async function fetchRooms() {
      const res = await fetch("/api/rooms");
      const data = await res.json();
      setRooms(data);
    }
    fetchRooms();
  }, []);

  return (
    <div className="container mx-auto px-6 py-20">
      <h2 className="text-5xl font-extrabold text-primary text-center mb-12">
        Discover Your Stay
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
        {rooms.length > 0 ? (
          rooms.map((room) => (
            <div
              key={room._id}
              className="relative bg-white rounded-2xl shadow-xl overflow-hidden transition transform hover:scale-105 hover:shadow-2xl"
            >
              {/* 🖼️ Image with Overlay */}
              <div className="relative w-full h-64">
                <Image
                  src={
                    room.images?.length > 0
                      ? room.images[0]
                      : "/default-room.jpg"
                  }
                  alt={room.name}
                  layout="fill"
                  objectFit="cover"
                  className="rounded-t-2xl"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/10 to-transparent"></div>
              </div>

              {/* 🏨 Room Details */}
              <div className="p-6">
                <h3 className="text-3xl font-semibold text-primary mb-2">
                  {room.name}
                </h3>

                {/* 💰 Pricing */}
                <div className="flex flex-col gap-1 text-gray-700">
                  <p>
                    <span className="font-semibold text-lg text-accent">
                      Full Board:
                    </span>{" "}
                    <span className="text-lg">
                      LKR {room.prices?.fullBoard}
                    </span>
                  </p>
                  <p>
                    <span className="font-semibold text-lg text-secondary">
                      Half Board:
                    </span>{" "}
                    <span className="text-lg">
                      LKR {room.prices?.halfBoard}
                    </span>
                  </p>
                  <p>
                    <span className="font-semibold text-lg text-gold">
                      Hourly:
                    </span>{" "}
                    <span className="text-lg">LKR {room.prices?.hourly}</span>
                  </p>
                </div>

                {/* 🔘 View Room Button */}
                <Link href={`/rooms/${room._id}`}>
                  <button className="mt-6 w-full bg-secondary text-white text-lg font-semibold py-3 rounded-xl hover:bg-red-700 transition-all shadow-md">
                    View Room
                  </button>
                </Link>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-600 col-span-3 text-xl">
            No rooms available. Please check back later.
          </p>
        )}
      </div>
    </div>
  );
}
