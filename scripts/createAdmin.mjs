import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import dotenv from "dotenv";

// ✅ Load environment variables from .env.local
dotenv.config({ path: ".env.local" });

// ✅ Support both MONGO_URL and MONGODB_URI
const mongoUri = process.env.MONGODB_URI || process.env.MONGO_URL;

if (!mongoUri) {
  console.error("❌ ERROR: MONGODB_URI is not defined. Check .env.local!");
  process.exit(1);
}

async function createAdmin() {
  try {
    await mongoose.connect(mongoUri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    const adminEmail = "dutheeshwork@gmail.com"; // Change this
    const adminPassword = "Dck2824981"; // Change this

    const { default: User } = await import("../lib/models/User.js"); // ✅ Dynamic import

    // Check if admin exists
    const existingAdmin = await User.findOne({ email: adminEmail });
    if (existingAdmin) {
      console.log("✅ Admin already exists.");
      mongoose.connection.close();
      return;
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(adminPassword, 10);

    // Create admin user
    const adminUser = new User({
      name: "Admin",
      email: adminEmail,
      password: hashedPassword,
      phone: "123456789",
      role: "admin",
    });

    await adminUser.save();
    console.log("✅ Admin user created successfully!");
    mongoose.connection.close();
  } catch (error) {
    console.error("❌ Error creating admin:", error);
  }
}

createAdmin();
