import mongoose from "mongoose";
import express from "express";
import fetchUser from "../middleware/user.js";

import Quiz from "../models/quizModel.js";
import Question from "../models/questionModel.js";
import User from "../models/userModel.js";

const router = express.Router();

router.get("/", async (req, res) => {
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

router.post("/:id/add", fetchUser, async (req, res) => {
    // add question to quiz by ID

    const { questionId } = req.body;
    const { id } = req.params;
    // check if quiz exists
    const quiz = await Quiz.findOne({ quiz_id: id });
    if (!quiz) {
        return res.status(404).json({ error: "Quiz not found" });
    }

    try {
        const question = await Question.findOne({ "id": questionId });
        if (!question) {
            return res.status(404).json({ error: "Question not found" });
        }
        quiz.questions.push(questionId);
        await quiz.save();
        res.json(quiz);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Server Error" });
    }
});

router.get("/list/:page", async (req, res) => {
    // get all quizzes
    const { page } = req.params;
    try {
        // paginate quizzes, limit to 10
        const quizzes = await Quiz.find()
            .limit(10)
            .skip(10 * (page - 1));
        res.json(quizzes);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Server Error" });
    }
});

router.get("/question/:id", async (req, res) => {
    // get a question by ID
    const { id } = req.params;
    try {
        const question = await Question.findOne({ "id": id });
        if (!question) {
            return res.status(404).json({ error: "Question not found" });
        }
        res.json(question);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Server Error" });
    }
}
);

router.get("/:id", async (req, res) => {
    // get a quiz by ID
    const { id } = req.params;
    try {
        const quiz = await Quiz.findOne({ quiz_id: id });
        if (!quiz) {
            return res.status(404).json({ error: "Quiz not found" });
        }
        // populate questions
        const questions = [];
        for (const questionId of quiz.questions) {
            const question = await Question.findOne({ "id": questionId });
            questions.push(question);
        }
        quiz.questions = questions;
        res.json(quiz);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Server Error" });
    }
});

router.patch("/:id", async (req, res) => {
    const { title, description, tags, category, difficulty } = req.body;
    const { id } = req.params;
    try {
        const quiz = await Quiz.findOne({ quiz_id: id});
        if (!quiz) {
            return res.status(404).json({ error: "Quiz not found" });
        }
        quiz.title = title;
        quiz.description = description;
        quiz.tags = tags;
        quiz.category = category;
        quiz.difficulty = difficulty;
        await quiz.save();
        res.json(quiz);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Server Error" });
    }

});

router.delete("/:id", async (req, res) => {
    // TODO: Delete quiz by ID
});

router.post("/:id/submit", async (req, res) => {
    // TODO: Submit quiz by ID
});

router.get("/user/:username", async (req, res) => {
    // get all quizzes by user
    const { username } = req.params;
    try {
        const quizzes = await Quiz.find({ author: username });
        res.json(quizzes);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Server Error" });
    }
});

export default router;
