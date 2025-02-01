import { NextResponse } from "next/server";
import { writeFile } from "fs/promises";
import path from "path";

export async function POST(req) {
  try {
    // Ensure request is a form-data type
    const contentType = req.headers.get("content-type");
    if (!contentType || !contentType.includes("multipart/form-data")) {
      return NextResponse.json(
        { message: "Invalid content type" },
        { status: 400 }
      );
    }

    // Parse FormData manually
    const formData = await req.formData();
    const files = formData.getAll("images"); // Get all uploaded files

    if (!files || files.length === 0) {
      return NextResponse.json(
        { message: "No files uploaded" },
        { status: 400 }
      );
    }

    const uploadedImages = [];

    for (const file of files) {
      const bytes = await file.arrayBuffer();
      const buffer = Buffer.from(bytes);
      const fileName = `${Date.now()}-${file.name}`;
      const filePath = path.join(process.cwd(), "public/uploads", fileName);

      await writeFile(filePath, buffer);
      uploadedImages.push(`/uploads/${fileName}`); // Store file URL
    }

    return NextResponse.json({
      message: "Images uploaded successfully!",
      images: uploadedImages,
    });
  } catch (error) {
    return NextResponse.json(
      { message: "Upload failed", error },
      { status: 500 }
    );
  }
}
