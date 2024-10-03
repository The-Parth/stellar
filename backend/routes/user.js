import mongoose from "mongoose";
import express from "express";

import User from "../models/userModel.js";


const router = express.Router();

router.get("/", async (req, res) => {
    res.send("User route");
}
);


router.post("/login", async (req, res) => {
    const { email, uid } = req.body;

    try {
        let user = await User.findOne({ email });
        console.log(req.body);
        if (!user) {
            console.log("User not found, creating new user");
            console.log(req.body);
            user = new User({ email, uid });
            await user.save();
        }

        res.status(200).json({ message: "Login successful", user });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error", error });
    }
});


router.get("/profile", async (req, res) => {
    // TODO: Get user profile
});

router.put("/profile", async (req, res) => {
    // TODO: Update user profile
});

router.delete("/delete", async (req, res) => {
    // TODO: Delete user
}
);


export default router;