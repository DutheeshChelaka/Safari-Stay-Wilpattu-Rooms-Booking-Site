import Image from "next/image";
import Link from "next/link";

export default function RoomCard({ room }) {
  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden transition transform hover:scale-105 hover:shadow-2xl">
      {/* ✅ Display Room Image (With Fallback) */}
      <div className="relative">
        {room.images && room.images.length > 0 ? (
          <Image
            src={
              room.images[0].startsWith("/")
                ? room.images[0]
                : `/uploads/${room.images[0]}`
            }
            alt={room.name}
            width={400}
            height={250}
            className="w-full h-56 object-cover transition duration-300 ease-in-out hover:brightness-90"
          />
        ) : (
          <div className="w-full h-56 flex items-center justify-center bg-gray-200">
            <p className="text-gray-500">No Image Available</p>
          </div>
        )}
      </div>

      {/* 📋 Room Details */}
      <div className="p-6">
        <h3 className="text-2xl font-semibold text-primary">{room.name}</h3>

        {/* 💰 Pricing */}
        <div className="mt-2 space-y-1">
          <p className="text-gray-700">
            <span className="font-semibold">Full Board:</span> LKR{" "}
            {room.prices?.fullBoard}
          </p>
          <p className="text-gray-700">
            <span className="font-semibold">Half Board:</span> LKR{" "}
            {room.prices?.halfBoard}
          </p>
          <p className="text-gray-700">
            <span className="font-semibold">Hourly:</span> LKR{" "}
            {room.prices?.hourly}
          </p>
        </div>

        {/* 🔗 View Room Button */}
        <Link href={`/rooms/${room._id}`}>
          <button className="mt-4 w-full bg-accent text-black px-4 py-2 rounded-lg shadow-md hover:bg-yellow-400 transition-all">
            View Room
          </button>
        </Link>
      </div>
    </div>
  );
}
