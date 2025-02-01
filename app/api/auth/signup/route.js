import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import connectDB from "@/lib/mongodb";
import User from "@/lib/models/User";
import validator from "validator";

export async function POST(req) {
  try {
    await connectDB();
    const { name, email, phone, password } = await req.json();

    // 🔹 1️⃣ Validate Email Format
    if (!validator.isEmail(email)) {
      return NextResponse.json(
        { message: "Invalid email format" },
        { status: 400 }
      );
    }

    // 🔹 2️⃣ Check if Email is Already Registered
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return NextResponse.json(
        { message: "Email already exists" },
        { status: 400 }
      );
    }

    // 🔹 3️⃣ Validate Phone Number Format
    if (!validator.isMobilePhone(phone, "any")) {
      return NextResponse.json(
        { message: "Invalid phone number" },
        { status: 400 }
      );
    }

    // 🔹 4️⃣ Validate Password Strength (At least 6 chars, 1 number)
    if (
      !validator.isStrongPassword(password, {
        minLength: 6,
        minNumbers: 1,
        minLowercase: 1, // Allow at least 1 lowercase letter
        minUppercase: 0, // Uppercase is optional
        minSymbols: 0, // Special symbols are optional
      })
    ) {
      return NextResponse.json(
        { message: "Password must be at least 6 characters with 1 number" },
        { status: 400 }
      );
    }

    // 🔹 5️⃣ Hash the Password
    const hashedPassword = await bcrypt.hash(password, 10);

    // 🔹 6️⃣ Save User in Database
    // Create new user with default role: "user"
    const newUser = new User({
      name,
      email,
      phone,
      password: hashedPassword,
      role: "user",
    });

    await newUser.save();

    return NextResponse.json(
      { message: "User registered successfully!" },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Signup failed", error },
      { status: 500 }
    );
  }
}
