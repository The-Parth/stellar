import mongoose from "mongoose";
import express from "express";

const router = express.Router();

router.get("/", async (res, req) => {
    res.send("Quiz route");
}

);

router.post("/create", async (req, res) => {
    // TODO: Create a quiz
});

router.get("/list", async (req, res) => {
    // TODO: Get list of quizzes
});

router.get("/:id", async (req, res) => {
    // TODO: Get quiz by ID
});

router.put("/:id", async (req, res) => {
    // TODO: Update quiz by ID
});

router.delete("/:id", async (req, res) => {
    // TODO: Delete quiz by ID
});

router.post("/:id/submit", async (req, res) => {
    // TODO: Submit quiz by ID
});

router.get("/user/:id", async (req, res) => {
    // TODO: Get quizzes by user ID
});


export default router;