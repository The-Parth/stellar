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
        const quiz = await Quiz.findOne({ quiz_id });

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
});

router.post("/:quiz_id", fetchUser, async (req, res) => {
    const { quiz_id } = req.params;
    const { answers, quizId } = req.body;

    if (quiz_id === undefined || answers === undefined) {
        return res.status(400).json({ error: "Invalid request" });
    }

    if (quiz_id !== quizId) {
        return res.status(400).json({ error: "Some sorcery is going on" });
    }

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

        let finalScore = 0;
        answers.forEach((answer) => {
            const question = questions.find(
                (question) => question.id === answer.questionId
            );
            if (!question) {
                return;
            }
            const qa = answer.answers;
            if (!qa) {
                return;
            }
            const correct = question.answer;
            let score = 0;
            if (question.type === "single") {
                if (qa[0] === correct[0]) {
                    score = question.points;
                }
            }
            if (question.type === "multiple") {
                let correctCount = 0;
                correct.forEach((c) => {
                    // check if the correct answer is selected
                    if (qa.includes(c)) {
                        correctCount++;
                    }
                });

                // check if all correct answers are selected, and no incorrect answer is selected
                if (correctCount === correct.length && correctCount === qa.length) {

                    score = question.points;
                }
            }
            finalScore += score;
        });

        console.log(12);

        // send the final score
        res.status(200).json({ finalScore });

    } catch (error) {}
});

export default router;
