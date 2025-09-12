import mongoose, { connection } from "mongoose";

export async function connectDB() {
  try {
    // Add await to ensure connection is established before continuing
    await mongoose.connect(process.env.MONGO_URI!);
    console.log("Connected to DB");

    // Move event listeners outside try block since they're not async
    connection.on("connected", () => {
      console.log("Connected MONGO");
    });

    connection.on("error", (err) => {
      console.log("Error in connecting to DB");
      console.log(err);
      process.exit(1); // Add exit code 1 to indicate error
    });
  } catch (error) {
    console.log("Something went wrong in connecting to DB");
    console.log(error);
    process.exit(1);
  }
}
