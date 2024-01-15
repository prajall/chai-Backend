import mongoose from "mongoose";
import { dbName } from "../constants.js";

const connectDB = async () => {
  try {
    const connectionInstance = await mongoose.connect(
      `${process.env.MONGODB_URL}/${dbName}`
    );
    console.log(
      "DATABASE CONNECTED !! HOST:",
      connectionInstance.connection.host
    );
  } catch (error) {
    console.error("MONGODB CONNECTION ERROR: ", error);
  }
};

export default connectDB;
