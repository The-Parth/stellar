import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

const URI = process.env.ATLAS_URI;

const connectToMongo = async () => {
    // remove ssl warning
    await mongoose.connect(URI, 
        {
            ssl: true,
        }
    );


    console.log("Connected to Database");
};

export default connectToMongo;