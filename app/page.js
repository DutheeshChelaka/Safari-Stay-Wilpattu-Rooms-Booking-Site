"use client";
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";

export default function Home() {
  const [rooms, setRooms] = useState([]);

  // 🔹 Fetch rooms from API
  useEffect(() => {
    async function fetchRooms() {
      const res = await fetch("/api/rooms");
      const data = await res.json();
      setRooms(data); // 🔥 Store rooms from database
    }
    fetchRooms();
  }, []);

  return (
    <div className="bg-background text-text">
      {/* 🌟 Hero Section */}
      <section className="relative h-screen flex flex-col items-center justify-center text-center bg-[url('/Home1.jpg')] bg-cover bg-center">
        <div className="absolute inset-0 bg-black opacity-50"></div>
        <div className="relative z-10 max-w-3xl px-6">
          <h1 className="text-5xl font-bold text-white">
            Experience Wilpattu Like Never Before
          </h1>
          <p className="text-lg text-gray-200 mt-4">
            Enjoy a luxurious stay while exploring Sri Lanka’s largest national
            park.
          </p>
          <Link href="/rooms">
            <button className="mt-6 bg-accent text-black px-6 py-3 rounded-lg shadow-md hover:bg-yellow-400 transition">
              Explore Rooms
            </button>
          </Link>
        </div>
      </section>

      {/* 🛏️ Featured Rooms (Dynamic from Database) */}
      <section className="container mx-auto px-6 py-20">
        <h2 className="text-4xl font-bold text-primary text-center">
          Our Rooms
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
                    room.images?.length > 0
                      ? room.images[0]
                      : "/default-room.jpg"
                  }
                  alt={room.name}
                  width={400}
                  height={250}
                  className="w-full h-48 object-cover"
                />
                <div className="p-6">
                  <h3 className="text-2xl font-bold text-primary">
                    {room.name}
                  </h3>

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
      </section>

      {/* 🌿 Services & Amenities */}
      <section className="bg-gray-100 py-20">
        <h2 className="text-4xl font-bold text-primary text-center">
          Our Amenities
        </h2>
        <div className="flex flex-wrap justify-center gap-10 mt-10">
          <div className="text-center">
            <Image src="/wifi.png" alt="Free WiFi" width={50} height={50} />
            <p className="text-lg text-gray-700 mt-2">Free WiFi</p>
          </div>
          <div className="text-center">
            <Image src="/food.png" alt="Dining" width={50} height={50} />
            <p className="text-lg text-gray-700 mt-2">Local Cuisine</p>
          </div>
          <div className="text-center">
            <Image
              src="/safari.png"
              alt="Safari Tours"
              width={50}
              height={50}
            />
            <p className="text-lg text-gray-700 mt-2">Safari Tours</p>
          </div>
        </div>
      </section>

      {/* 🌟 Call to Action */}
      <section className="text-center py-20">
        <h2 className="text-4xl font-bold text-primary">
          Ready for Your Wilpattu Adventure?
        </h2>
        <p className="text-lg text-gray-600 mt-4">
          Book your stay now and immerse yourself in nature!
        </p>
        <Link href="/booking">
          <button className="mt-6 bg-accent text-black px-6 py-3 rounded-lg shadow-md hover:bg-yellow-400 transition">
            Book Now
          </button>
        </Link>
      </section>
    </div>
  );
}
