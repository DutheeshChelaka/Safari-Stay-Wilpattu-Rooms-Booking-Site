"use client";
import { useState } from "react";

export default function AdminPanel() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [fullBoard, setFullBoard] = useState("");
  const [halfBoard, setHalfBoard] = useState("");
  const [hourly, setHourly] = useState("");
  const [images, setImages] = useState([]);
  const [uploadedImages, setUploadedImages] = useState([]);

  const handleFileChange = (e) => setImages(e.target.files);

  const uploadImages = async () => {
    if (images.length === 0) {
      alert("Please select images to upload.");
      return;
    }

    const formData = new FormData();
    for (const file of images) {
      formData.append("images", file);
    }

    const res = await fetch("/api/upload", { method: "POST", body: formData });
    const data = await res.json();

    if (data.images) {
      setUploadedImages(data.images);
      alert("Images uploaded successfully!");
    } else {
      alert("Image upload failed.");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (uploadedImages.length === 0) {
      alert("Please upload images first!");
      return;
    }

    const res = await fetch("/api/rooms", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name,
        description,
        prices: { fullBoard, halfBoard, hourly },
        images: uploadedImages,
      }),
    });

    if (res.ok) {
      alert("Room added successfully!");
      setName("");
      setDescription("");
      setFullBoard("");
      setHalfBoard("");
      setHourly("");
      setUploadedImages([]);
    } else {
      alert("Failed to add room!");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-lg mx-auto p-8">
      <h2 className="text-3xl font-bold mb-6 text-center">Add New Room</h2>

      <input
        type="text"
        placeholder="Room Name"
        className="w-full p-3 border mb-4"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      />
      <textarea
        placeholder="Room Description"
        className="w-full p-3 border mb-4"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        required
      />

      <input
        type="number"
        placeholder="Full Board Price"
        className="w-full p-3 border mb-4"
        value={fullBoard}
        onChange={(e) => setFullBoard(e.target.value)}
        required
      />
      <input
        type="number"
        placeholder="Half Board Price"
        className="w-full p-3 border mb-4"
        value={halfBoard}
        onChange={(e) => setHalfBoard(e.target.value)}
        required
      />
      <input
        type="number"
        placeholder="Hourly Price"
        className="w-full p-3 border mb-4"
        value={hourly}
        onChange={(e) => setHourly(e.target.value)}
        required
      />

      <input
        type="file"
        multiple
        className="w-full mb-4"
        onChange={handleFileChange}
      />
      <button
        type="button"
        onClick={uploadImages}
        className="w-full bg-green-500 text-white py-2 mb-4"
      >
        Upload Images
      </button>

      <button type="submit" className="w-full bg-blue-500 text-white py-3">
        Add Room
      </button>
    </form>
  );
}
