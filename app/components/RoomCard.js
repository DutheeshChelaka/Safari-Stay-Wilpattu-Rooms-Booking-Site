import Image from "next/image";

export default function RoomCard({ room }) {
  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden">
      {/* ✅ Fix: Add condition to check if images exist */}
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
          className="w-full h-48 object-cover"
        />
      ) : (
        <div className="w-full h-48 flex items-center justify-center bg-gray-200">
          <p className="text-gray-500">No Image Available</p>
        </div>
      )}

      <div className="p-4">
        <h3 className="text-xl font-bold text-primary">{room.name}</h3>
        <p className="text-gray-600">${room.prices?.fullBoard} per night</p>
      </div>
    </div>
  );
}
