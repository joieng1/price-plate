import mongoose from "mongoose";


const url: string = process.env.MONGO_URI as string;
let connection: typeof mongoose;
/* comment*/

/**
 * Makes a connection to a MongoDB database. If a connection already exists, does nothing
 * Call this function before all api routes
 * @returns {Promise<typeof mongoose>}
 */
const connectDB = async () => {
  if (mongoose.connections[0].readyState) {
    console.log('MongoDB Already connected.');
    return;
  }
  try {
    await mongoose.connect(url);
    console.log('MongoDB connected successfully.');
  } catch (error) {
    console.error('MongoDB connection error:', error);
    throw new Error('MongoDB connection failed.');
  }
};

export default connectDB;
