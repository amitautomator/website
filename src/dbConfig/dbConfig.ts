import mongoose from "mongoose";

// Track connection state to prevent multiple connections
let isConnected = false;

export async function connectDB() {
  // If already connected, return early
  if (isConnected) {
    console.log("Already connected to MongoDB");
    return;
  }

  // If mongoose is already connected, set flag and return
  if (mongoose.connections[0].readyState) {
    isConnected = true;
    console.log("MongoDB already connected");
    return;
  }

  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGO_URI!, {
      // These options help with connection stability
      bufferCommands: false,
    });

    isConnected = true;
    console.log("✅ Connected to MongoDB successfully");

    // Handle connection events
    mongoose.connection.on("connected", () => {
      console.log("📡 MongoDB connection established");
    });

    mongoose.connection.on("error", (err) => {
      console.error("❌ MongoDB connection error:", err);
      isConnected = false;
    });

    mongoose.connection.on("disconnected", () => {
      console.log("📴 MongoDB disconnected");
      isConnected = false;
    });

    // Handle process termination
    process.on("SIGINT", async () => {
      await mongoose.connection.close();
      console.log("MongoDB connection closed through app termination");
      process.exit(0);
    });
  } catch (error) {
    console.error("❌ Failed to connect to MongoDB:", error);
    isConnected = false;

    // In production, you might want to retry instead of exiting
    if (process.env.NODE_ENV === "production") {
      // Optionally implement retry logic here
      setTimeout(() => connectDB(), 5000); // Retry after 5 seconds
    } else {
      process.exit(1);
    }
  }
}

// Optional: Function to disconnect (useful for testing)
export async function disconnectDB() {
  try {
    await mongoose.connection.close();
    isConnected = false;
    console.log("MongoDB disconnected successfully");
  } catch (error) {
    console.error("Error disconnecting from MongoDB:", error);
  }
}
