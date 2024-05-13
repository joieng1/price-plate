import mongoose from "mongoose";

const url = process.env.MONGO_URI;

const connectDB = async () => {
    if (!connection) {
        connection = await mongoose.connect(url);
        return connection;
    }
};
  
export default connectDB;