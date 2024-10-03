import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    uid: {
        type: String,
        required: true,
        unique: true
    }, // Firebase UID

    email: {
        type: String,
        required: true,
        unique: true
    },

    name: {
        type: String,
        required: true
    },

    photoURL: {
        type: String,
    },

    createdAt: {
        type: Date,
        default: Date.now
    },

    role: {
        type: String,
        default: "user", // can be admin
    }

});

const User = mongoose.model("User", UserSchema);

export default User;