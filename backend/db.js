import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

const URI = process.env.ATLAS_URI;

const connectToMongo = async () => {
    await mongoose.connect(URI);
    console.log("Connected to Database");
};

export default connectToMongo;
