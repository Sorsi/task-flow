import mongoose from "mongoose";

const uri = process.env.ATLAS_URI || "";

const connectDB = async () => {
  try {
    await mongoose.connect(uri, {
      dbName: "TaskFlow",
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("✅ MongoDB connected successfully!");
  } catch (error) {
    console.error("❌ MongoDB connection error:", error);
    process.exit(1);
  }
};

export default connectDB;
