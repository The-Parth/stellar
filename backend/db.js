import { MongoClient } from "mongodb";

const uri = "mongodb+srv://parth:koishi@jade.6ab4c.mongodb.net/?retryWrites=true&w=majority&appName=jade"; // Replace with your MongoDB connection string
const client = new MongoClient(uri);

let db;

const connectDB = async () => {
    if (db) return db;
    try {
        await client.connect();
        db = client.db("test"); // Replace with your database name
        console.log("Connected to MongoDB");
        return db;
    } catch (error) {
        console.error("Could not connect to MongoDB", error);
        throw error;
    }
};

export default connectDB;