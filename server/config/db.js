import mongoose from "mongoose";

const connectDB = async () => {
  const mongoUri = process.env.MONGO_URI;

  if (!mongoUri) {
    throw new Error("MONGO_URI is missing. Add it inside server/.env");
  }

  try {
    const connection = await mongoose.connect(mongoUri, {
      dbName: process.env.DB_NAME || "studyplanner",
      serverSelectionTimeoutMS: 10000,
    });

    console.log("MongoDB connected successfully");
    console.log(`Database host: ${connection.connection.host}`);
  } catch (error) {
    console.log("MongoDB connection failed:", error.message);

    if (error.message.includes("querySrv")) {
      console.log("MongoDB Atlas DNS lookup failed.");
      console.log("Try another network or set your Wi-Fi DNS to 8.8.8.8 and 1.1.1.1.");
      console.log("Also confirm your current IP is allowed in MongoDB Atlas Network Access.");
    }

    throw error;
  }
};

export default connectDB;
