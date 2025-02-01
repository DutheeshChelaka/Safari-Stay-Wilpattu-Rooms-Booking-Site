"use client";
import { useState, useEffect } from "react";

export default function AdminPanel() {
  const [rooms, setRooms] = useState([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [fullBoard, setFullBoard] = useState("");
  const [halfBoard, setHalfBoard] = useState("");
  const [hourly, setHourly] = useState("");
  const [newImages, setNewImages] = useState([]); // New images to upload
  const [existingImages, setExistingImages] = useState([]); // Previously uploaded images
  const [coverImage, setCoverImage] = useState(""); // Selected cover image
  const [editingRoom, setEditingRoom] = useState(null); // Room being edited

  useEffect(() => {
    fetchRooms();
  }, []);

  const fetchRooms = async () => {
    const res = await fetch("/api/rooms");
    const data = await res.json();
    setRooms(data);
  };

  // Handle new image uploads
  const handleFileChange = (e) => {
    setNewImages([...e.target.files]);
  };

  // Upload new images
  const uploadImages = async () => {
    if (newImages.length === 0) {
      alert("Please select images to upload.");
      return;
    }

    const formData = new FormData();
    for (const file of newImages) {
      formData.append("images", file);
    }

    const res = await fetch("/api/upload", { method: "POST", body: formData });
    const data = await res.json();

    if (data.images) {
      setExistingImages([...existingImages, ...data.images]); // Keep old + new images
      if (!coverImage) setCoverImage(data.images[0]); // Default first uploaded as cover
      alert("Images uploaded successfully!");
    } else {
      alert("Image upload failed.");
    }
  };

  // Handle adding or updating a room
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!coverImage) {
      alert("Please select a cover image.");
      return;
    }

    const roomData = {
      name,
      description,
      prices: { fullBoard, halfBoard, hourly },
      images: existingImages,
      coverImage,
    };

    const res = await fetch(
      editingRoom ? `/api/rooms/${editingRoom._id}` : "/api/rooms",
      {
        method: editingRoom ? "PUT" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(roomData),
      }
    );

    if (res.ok) {
      alert(
        editingRoom ? "Room updated successfully!" : "Room added successfully!"
      );
      resetForm();
      fetchRooms();
    } else {
      alert("Failed to save room!");
    }
  };

  // Delete a room
  const deleteRoom = async (id) => {
    if (!confirm("Are you sure you want to delete this room?")) return;

    const res = await fetch(`/api/rooms/${id}`, { method: "DELETE" });

    if (res.ok) {
      alert("Room deleted successfully!");
      fetchRooms(); // ✅ Refresh room list
    } else {
      alert("Failed to delete room!");
    }
  };

  // Load room details into form for editing
  const editRoom = (room) => {
    setEditingRoom(room);
    setName(room.name);
    setDescription(room.description);
    setFullBoard(room.prices.fullBoard);
    setHalfBoard(room.prices.halfBoard);
    setHourly(room.prices.hourly);
    setExistingImages(room.images);
    setCoverImage(room.coverImage);
  };

  // Remove an existing image
  const removeImage = (image) => {
    setExistingImages(existingImages.filter((img) => img !== image));
    if (coverImage === image) setCoverImage(""); // Remove cover if it's deleted
  };

  // Reset form
  const resetForm = () => {
    setEditingRoom(null);
    setName("");
    setDescription("");
    setFullBoard("");
    setHalfBoard("");
    setHourly("");
    setExistingImages([]);
    setCoverImage("");
  };

  return (
    <div className="container mx-auto p-8">
      <h2 className="text-3xl font-bold mb-6 text-center text-primary">
        {editingRoom ? "Edit Room" : "Add New Room"}
      </h2>

      {/* Room Form */}
      <form
        onSubmit={handleSubmit}
        className="max-w-lg mx-auto bg-white shadow-lg p-6 rounded-lg border"
      >
        <input
          type="text"
          placeholder="Room Name"
          className="w-full p-3 border mb-4 rounded"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <textarea
          placeholder="Room Description"
          className="w-full p-3 border mb-4 rounded"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
        <input
          type="number"
          placeholder="Full Board Price"
          className="w-full p-3 border mb-4 rounded"
          value={fullBoard}
          onChange={(e) => setFullBoard(e.target.value)}
          required
        />
        <input
          type="number"
          placeholder="Half Board Price"
          className="w-full p-3 border mb-4 rounded"
          value={halfBoard}
          onChange={(e) => setHalfBoard(e.target.value)}
          required
        />
        <input
          type="number"
          placeholder="Hourly Price"
          className="w-full p-3 border mb-4 rounded"
          value={hourly}
          onChange={(e) => setHourly(e.target.value)}
          required
        />

        {/* Upload Images */}
        <input
          type="file"
          multiple
          className="w-full mb-4"
          onChange={handleFileChange}
        />
        <button
          type="button"
          onClick={uploadImages}
          className="w-full bg-green-600 text-white py-2 mb-4 rounded hover:bg-green-700 transition"
        >
          Upload Images
        </button>

        {/* Show Images */}
        {existingImages.length > 0 && (
          <div className="mb-4">
            <h3 className="font-semibold text-lg mb-2">Uploaded Images</h3>
            <div className="grid grid-cols-3 gap-4">
              {existingImages.map((img, index) => (
                <div key={index} className="relative">
                  <img
                    src={img}
                    alt="Uploaded"
                    className={`w-full h-20 object-cover cursor-pointer ${
                      coverImage === img ? "border-4 border-blue-500" : ""
                    }`}
                    onClick={() => setCoverImage(img)}
                  />
                  <button
                    onClick={() => removeImage(img)}
                    className="absolute top-0 right-0 bg-red-500 text-white px-2 py-1 text-xs"
                  >
                    X
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-3 rounded hover:bg-blue-600 transition"
        >
          {editingRoom ? "Update Room" : "Add Room"}
        </button>
      </form>

      {/* Room List for Managing */}
      <h2 className="text-3xl font-bold mt-10 mb-4 text-primary text-center">
        Manage Rooms
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {rooms.map((room) => (
          <div
            key={room._id}
            className="bg-white rounded-lg shadow-md p-4 border"
          >
            <img
              src={
                room.images?.length > 0 ? room.images[0] : "/default-room.jpg"
              }
              alt={room.name}
              width={400}
              height={250}
              className="w-full h-48 object-cover"
            />
            <h3 className="text-xl font-bold text-primary mt-2">{room.name}</h3>
            <p className="text-gray-600">
              Full Board: LKR {room.prices.fullBoard}
            </p>

            <div className="flex justify-between mt-4">
              <button
                onClick={() => editRoom(room)}
                className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600 transition"
              >
                Edit
              </button>
              <button
                onClick={() => deleteRoom(room._id)}
                className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
