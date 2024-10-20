import mongoose from "mongoose";
import express from "express";
import fetchUser from "../middleware/user.js";

import Quiz from "../models/quizModel.js";
import Question from "../models/questionModel.js";
import User from "../models/userModel.js";
import Attempts from "../models/attemptModel.js";

const router = express.Router();

router.get("/", async (req, res) => {
    res.send("Attempt route");
});

router.get("/:quiz_id", fetchUser, async (req, res) => {
    const { quiz_id } = req.params;
    try {
        const quiz = await Quiz.findOne
        ({ quiz_id });

        if (!quiz) {
            return res.status(404).json({ error: "Quiz not found" });
        }

        var questions = [];
        for (const questionId of quiz.questions) {
            const question = await Question.findOne({
                id: questionId,
            });
            if (!question) {
                continue;
            }

            question.answer = undefined;
            questions.push(question);
        }

        quiz.questions = questions;

        res.status(200).json(quiz);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
}

);

router.post("/:quiz_id", fetchUser, async (req, res) => {
    const { quiz_id } = req.params;
    const { answers } = req.body;
    console.log(answers);
    try {
        const quiz = await Quiz.findOne({ quiz_id });

        if (!quiz) {
            return res.status(404).json({ error: "Quiz not found" });
        }
        const questions = [];
        for (const questionId of quiz.questions) {
            const question = await Question.findOne({ id: questionId });
            if (!question) {
                continue;
            }
            questions.push(question);
        }

        let score = 0;
        for (let i = 0; i < questions.length; i++) {
            if (questions[i].correct_option === answers[i]) {
                score++;
            }
        }

        const attempt = new Attempts({
            quiz_id,
            user_id: req.user.id,
            score,
            answers,
        });

        await attempt.save();
        res.status(200).json({ score
        });

    } catch (error) {}
});

export default router;
