import mongoose from "mongoose";

let connected = false;

const connectDb = async () => {
  mongoose.set("strictQuery", true);

  //if the database is already connected , don't connect again

  if (connected) {
    console.log("MongoDB is already connected...");
    return;
  }

  //connect to mongo db database

  try {
    await mongoose.connect(process.env.MONGODB_URI);
    connected = true;
    console.log("MongoDB connected...");
  } catch (err) {
    console.log(err.message);
  }
};

export default connectDb;
