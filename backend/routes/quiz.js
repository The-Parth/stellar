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
    const { question, type, options, answer, points } = req.body;
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
            points: points || 1,
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
                author: req.user.id,
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
        const question = await Question.findOne({ id: questionId });
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
    if (page < 1 || isNaN(page)) {
        // return number of pages
        const count = await Quiz.countDocuments({ isPublished: true });
        return res.json({ pages: Math.ceil(count / 10) });
    }
    try {
        // paginate quizzes, limit to 10
        const quizzes = await Quiz.find({ isPublished: true })
            .limit(10)
            .skip(10 * (page - 1));

        // remove questions from response
        for (const quiz of quizzes) {
            quiz.questions = quiz.questions.length;
        }

        // fetch authors
        for (const quiz of quizzes) {
            const author = await User.findById(quiz.author);
            quiz.author = author.username;
        }

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
        const question = await Question.findOne({ id: id });
        if (!question) {
            return res.status(404).json({ error: "Question not found" });
        }
        res.json(question);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Server Error" });
    }
});

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
            const question = await Question.findOne({ id: questionId });
            if (!question) {
                questions.push(
                    { error: true, id: questionId }
                );
                continue;

            }
            questions.push(question);
        }
        quiz.questions = questions;
        res.json(quiz);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Server Error" });
    }
});

router.patch("/:id", fetchUser, async (req, res) => {
    const { title, description, tags, category, difficulty, duration } =
        req.body;
    const { id } = req.params;
    try {
        const quiz = await Quiz.findOne({ quiz_id: id });
        if (!quiz) {
            return res.status(404).json({ error: "Quiz not found" });
        }
        quiz.title = title;
        quiz.description = description;
        quiz.tags = tags;
        quiz.category = category;
        quiz.difficulty = difficulty;
        if (duration) {
            quiz.duration = duration;
        }
        await quiz.save();
        res.json(quiz);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Server Error" });
    }
});

router.patch("/:id/publish", fetchUser, async (req, res) => {
    const { id } = req.params;
    const { published } = req.body;
    console.log(published);
    try {
        const quiz = await Quiz.findOne({ quiz_id: id });
        if (!quiz) {
            return res.status(404).json({ error: "Quiz not found" });
        }
        quiz.isPublished = published;
        await quiz.save();
        res.json(quiz);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Server Error" });
    }
});

router.delete("/:id", fetchUser, async (req, res) => {
    // delete quiz by ID
    const { id } = req.params;
    try {
        const quiz = await Quiz.findOne({ quiz_id: id });
        if (!quiz) {
            return res.status(404).json({ error: "Quiz not found" });
        }
        // Check if the user is the author of the quiz
        if (quiz.author.toString() !== req.user.id) {
            return res.status(403).json({ error: "Unauthorized" });
        }
        await Quiz.deleteOne({ quiz_id: id });
        res.json({ message: "Quiz deleted" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Server Error" });
    }
});

router.get("/user/:username", async (req, res) => {
    // get all quizzes by user
    const { username } = req.params;
    try {
        const user = await User.findOne({ username });
        console.log(user);
        const quizzes = await Quiz.find({ author: user.id });
        res.json(quizzes);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Server Error" });
    }
});

router.delete("/:id/question/:questionId", async (req, res) => {
    // delete question from quiz
    const { id, questionId } = req.params;
    console.log(id, questionId);
    var operation = "";
    try {
        const quiz = await Quiz.findOne({ quiz_id: id });
        if (!quiz) {
            return res.status(404).json({ error: "Quiz not found" });
        }
        const index = quiz.questions.indexOf(questionId);
        if (index > -1) {
            quiz.questions.splice(index, 1);
            operation = "deleted";
        } else {
            operation = "not found";
        }
        await quiz.save();
        res.json({ message: `Question ${operation}`, quiz });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Server Error" });
    }
});

export default router;
