import express from "express";
import User from "../models/userModel.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import fetchUser from "../middleware/user.js";

const JWT_token = process.env.JWT_TOKEN;
import { body, validationResult } from "express-validator";

const router = express.Router();

// Route:1 Register Route
router.post(
    "/register",
    [
        body("name").isLength({ min: 3 }),
        body("email").isEmail(),
        body("username").isLength({ min: 3 }),
        body("password").isLength({ min: 6 }),
    ],
    async (req, res) => {
        const success = false;
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ success, errors: errors.array() });
        }
        // Checking if user email is already exists or not
        try {
            let user = await User.findOne({ email: req.body.email });
            if (user) {
                return res.status(400).json({
                    success,
                    Error: "User with this email already exist",
                });
            }
            // Creating User
            const salt = await bcrypt.genSalt(10);
            let secPass = await bcrypt.hash(req.body.password, salt);
            user = await User.create({
                username: req.body.username,
                name: req.body.name,
                password: secPass,
                email: req.body.email,
            });
            const data = {
                id: user.id,
            };
            const token = jwt.sign(data, JWT_token);
            res.json({ success: true, token });
        } catch (error) {
            console.error(error);
        }
    }
);

// Route:2 Login Route
router.post(
    "/login",
    [body("email").isEmail(), body("password").exists()],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        const { email, password } = req.body;
        try {
            let success = false;
            let user = await User.findOne({ email });
            if (!user) {
                return res.status(400).json({
                    success,
                    error: "Please login with appropriate credentials",
                });
            }
            const comPassword = await bcrypt.compare(password, user.password);
            if (!comPassword) {
                return res.status(400).json({
                    success,
                    error: "Please login with appropriate credentials",
                });
            }
            const data = {
                id: user.id,
            };
            const token = jwt.sign(data, JWT_token);
            res.json({ success: true, token });
        } catch (error) {
            console.error(error);
        }
    }
);

//  Route:3 To get user details using from Token

router.post("/getuser", fetchUser, async (req, res) => {
    console.log("Get User");
    try {
        const userId = req.user.id;
        const user = await User.findById(userId).select("-password");
        res.json(user);
    } catch (error) {
        console.error(error);
    }
});

router.get("/userbyid/:id", async (req, res) => {
    try {
        const user = await User.findById(req.params.id);

        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }

        // remove the password property before sending it back
        user.password = undefined;

        res.json(user);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Server Error" });
    }
});

// Route:4 Update User Details
router.put("/update", fetchUser, async (req, res) => {
    try {
        const userId = req.user.id;
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }

        // Update user details
        user.name = req.body.name || user.name;
        user.email = req.body.email || user.email;
        user.username = req.body.username || user.username;

        // Check if old password is correct
        const comparePassword = await bcrypt.compare(req.body.oldPassword, user.password);
        if (!comparePassword) {
            return res.status(400).json({ error: "Invalid password" });
        }

        // Check if new password is provided
        if (req.body.newPassword) {
            const salt = await bcrypt.genSalt(10);
            user.password = await bcrypt.hash(req.body.newPassword, salt);
        }

        await user.save();

        // Return a meaningful response without exposing the password
        res.json({
            id: user._id,
            name: user.name,
            email: user.email,
            username: user.username,
            message: "User details updated successfully"
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Server Error" });
    }
});

    

export default router;
