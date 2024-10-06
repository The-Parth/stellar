import mongoose from "mongoose";
import express from "express";
import fetchUser from "../middleware/user.js";

import Quiz from "../models/quizModel.js";
import Question from "../models/questionModel.js";
import User from "../models/userModel.js";

const router = express.Router();

router.get("/", async (res, req) => {
    res.send("Quiz route");
});

router.post("/question/create", fetchUser, async (req, res) => {
    const { question, type, options, answer } = req.body;
    // generate random id, based on current time and author
    const id = "q" + Date.now() + "_" + req.user.id;
    console.log(id);
    try {
        const newQuestion = new Question({
            question,
            type,
            options,
            answer,
            id,
        });
        await newQuestion.save();
        res.json(newQuestion);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error", error });
    }
});

router.post("/create", fetchUser, async (req, res) => {
    const { title, description } = req.body;
    const { tags, category, difficulty } = req.body;
    if (!title || !description) {
        return res
            .status(400)
            .json({ error: "Title and description required" });
    }
    try {
        const userId = req.user.id;
        User.findById(userId).then(async (user) => {
            // generate random id, based on current time and author
            const id = "s" + Date.now() + "_" + req.user.id;
            console.log(id);
            console.log(req.user);
            const newQuiz = new Quiz({
                author: user.username,
                quiz_id: id,
                title,
                description,
                tags,
                category,
                difficulty,
                questions: [],
                users: [req.user.id],
            });
            await newQuiz.save();
            res.json(newQuiz);
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error", error });
    }
});

router.get("/:id/add", fetchUser, async (req, res) => {
    // add question to quiz by ID

    const { questionId } = req.body;
    const { id } = req.params;
    // check if quiz exists
    const quiz = await Quiz.findById(id);
    if (!quiz) {
        return res.status(404).json({ error: "Quiz not found" });
    }

    try {
        const quiz = await Quiz.findById(id);
        if (!quiz) {
            return res.status(404).json({ error: "Quiz not found" });
        }

        // check if author username matches
        if (quiz.author !== req.user.username) {
            return res.status(401).json({ error: "Unauthorized" });
        }

        const question = await Question.findById(questionId);
        if (!question) {
            return res.status(404).json({ error: "Question not found" });
        }
        quiz.questions.push(question);
        await quiz.save();
        res.json(quiz);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Server Error" });
    }
});

router.get("/list", async (req, res) => {
    // TODO: Get list of quizzes
});

router.get("/:id", async (req, res) => {
    // get a quiz by ID
    const { id } = req.params;
    try {
        const quiz = await Quiz.findById(id).populate("questions");
        if (!quiz) {
            return res.status(404).json({ error: "Quiz not found" });
        }
        res.json(quiz);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Server Error" });
    }
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
