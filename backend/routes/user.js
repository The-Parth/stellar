import mongoose from "mongoose";
import express from "express";

import User from "../models/User.js";


const router = express.Router();

router.get("/", async (req, res) => {
    res.send("User route");
}
);

router.post("/login", async (req, res) => {
    // TODO: Implement login with firebase
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