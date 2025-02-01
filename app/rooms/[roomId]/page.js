"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/autoplay";

export default function RoomDetails() {
  const params = useParams();
  const roomId = params.roomId;
  const [room, setRoom] = useState(null);
  const [lightboxImage, setLightboxImage] = useState(null);

  useEffect(() => {
    async function fetchRoom() {
      const res = await fetch(`/api/rooms/${roomId}`);
      const data = await res.json();
      setRoom(data);
    }
    fetchRoom();
  }, [roomId]);

  if (!room)
    return (
      <p className="text-center mt-10 text-xl font-semibold text-gray-600">
        Loading room details...
      </p>
    );

  return (
    <div className="container mx-auto px-6 py-12">
      {/* 🖼️ Image Slider */}
      <div className="w-full max-w-4xl mx-auto">
        <Swiper
          modules={[Navigation, Pagination, Autoplay]}
          navigation
          pagination={{ clickable: true }}
          autoplay={{ delay: 3000 }}
          className="w-full h-[500px] rounded-lg shadow-lg"
        >
          {room.images.map((img, index) => (
            <SwiperSlide key={index}>
              <img
                src={img}
                alt={`Room Image ${index + 1}`}
                className="w-full h-[500px] object-cover rounded-lg cursor-pointer transition hover:scale-105"
                onClick={() => setLightboxImage(img)}
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {/* 🏨 Room Information */}
      <div className="mt-10 p-8 bg-white shadow-xl rounded-lg text-gray-800">
        <h1 className="text-4xl font-bold text-primary">{room.name}</h1>
        <p className="text-lg text-gray-600 mt-3">{room.description}</p>

        {/* 💰 Pricing Section */}
        <div className="mt-6 p-6 bg-gray-100 rounded-lg shadow-md">
          <h3 className="text-2xl font-semibold text-primary">Pricing</h3>
          <div className="mt-3 grid grid-cols-1 md:grid-cols-3 gap-6 text-lg">
            <div className="p-4 bg-white rounded-lg shadow text-center">
              <span className="font-semibold text-accent">Full Board</span>
              <p className="text-xl font-bold">LKR {room.prices.fullBoard}</p>
            </div>
            <div className="p-4 bg-white rounded-lg shadow text-center">
              <span className="font-semibold text-secondary">Half Board</span>
              <p className="text-xl font-bold">LKR {room.prices.halfBoard}</p>
            </div>
            <div className="p-4 bg-white rounded-lg shadow text-center">
              <span className="font-semibold text-gold">Hourly</span>
              <p className="text-xl font-bold">LKR {room.prices.hourly}</p>
            </div>
          </div>
        </div>

        {/* 📌 Book Now Button */}
        <button className="mt-8 w-full md:w-auto px-6 py-3 bg-accent text-white text-lg font-semibold rounded-lg shadow-lg hover:bg-yellow-500 transition-all">
          Book Now
        </button>
      </div>

      {/* 🔍 Lightbox for Full-Size Images */}
      {lightboxImage && (
        <div
          className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50"
          onClick={() => setLightboxImage(null)}
        >
          <div className="relative max-w-5xl w-full flex justify-center">
            <img
              src={lightboxImage}
              alt="Full View"
              className="max-w-full max-h-[90vh] rounded-lg"
            />
            <button
              className="absolute top-5 right-5 bg-white text-black px-4 py-2 rounded-full text-lg font-semibold shadow-lg hover:bg-gray-300 transition"
              onClick={() => setLightboxImage(null)}
            >
              ✕ Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
