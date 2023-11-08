import mongoose from 'mongoose';

let isConnected = false; //variable to track the connection status to db

export const connectToDB = async() => {
  mongoose.set('strictQuery', true);

  if(!process.env.MONGODB_URI) return console.log('No MongoDB URI provided');

  if (isConnected) return console.log('=> using existing database connection');

  try {
    await mongoose.connect(process.env.MONGODB_URI);
    isConnected = true;
    console.log('Connected to MongoDB');

  } catch (error:any) {
    console.log('Failed to connect to MongoDB', error.message);
  }
}