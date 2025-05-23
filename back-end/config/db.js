import { connect } from "mongoose";

// Connect to MongoDB
export const dbConnection = async (url) => {
  try {
    await connect(url);
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("Failed to connect to MongoDB:", error.message);
    process.exit(1);
  }
};
