import mongoose from "mongoose";

const connectDB = async () => {
  const URI = process.env.MONGO_URI || "";
  try {
    const conn = await mongoose.connect(URI);
    console.log(`MongoDB connected: ${conn.connection.host}`);
  } catch (err: any) {
    console.error(`Error:${err.message}`);
    process.exit(1);
  }
};

export default connectDB;
