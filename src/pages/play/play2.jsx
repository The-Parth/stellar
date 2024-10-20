import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

import { backendUrl } from "../../config";

import Navbar from "../../components/Navbar";
import e from "cors";

const PlayQuiz = () => {
    const { quizId } = useParams();
    const [quiz, setQuiz] = useState(null);
    const [score, setScore] = useState(0);

    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);

    const token = localStorage.getItem("token");

    const handleOptionChange = (questionIndex, option, isMultiple = false, isChecked = true) => {

        const newQuestions = [...quiz.questions];
        const currentQuestion = newQuestions[questionIndex];

        if (!currentQuestion.selectedOptions) {
            currentQuestion.selectedOptions = [];
        }
        
        if (isMultiple) {
            if (isChecked) {
                currentQuestion.selectedOptions.push(option);
            } else {
                currentQuestion.selectedOptions = currentQuestion.selectedOptions.filter((selectedOption) => selectedOption !== option);
            }
        } else {
            currentQuestion.selectedOptions = [option];
        }

        newQuestions[questionIndex] = currentQuestion;
        console.log(newQuestions);
        setQuiz({
            ...quiz,
            questions: newQuestions,
        });
    };

    const handleSubmit = () => {
        var responseObject = {
            quizId: quizId,
            answers: quiz.questions.map((question) => {
                return {
                    questionId: question.id,
                    answers: question.selectedOptions,
                };
            }),
        };
        console.log(responseObject);

        // post to backendUrl/api/play/:quizId
        axios
            .post(`${backendUrl}/api/play/${quizId}`, responseObject, {
                headers: {
                    "Content-Type": "application/json",
                    "auth-token": token,
                },
            })
            .then((response) => {
                console.log(response.data);
                setScore(response.data.score);
            })
            .catch((error) => {
                console.log(error);
            });

        return;
    };

    // fetch quiz data by quizId from backendUrl/api/play/:quizId
    useEffect(() => {
        if (!quizId) {
            return;
        }
        if (!token) {
            navigate("/login");
        }
        const fetchQuiz = () => {
            axios
                .get(`${backendUrl}/api/play/${quizId}`, {
                    headers: {
                        "Content-Type": "application/json",
                        "auth-token": token,
                    },
                })
                .then((response) => {
                    setQuiz(response.data);
                    setTimeout(() => {
                        setLoading(false);
                    }, 1450);
                    console.log(response.data);
                })
                .catch((error) => {
                    console.log(error);
                });
        };
        fetchQuiz();
    }, [quizId]);

    return (
        <>
            {quiz && !loading ? (
                <>
                    <Navbar />
                    <div className="p-8">
                        <h1 className="text-2xl font-bold mb-4">
                            {quiz.title}
                        </h1>
                        {quiz.questions.map((question, index) => (
                            <div key={index} className="mb-6">
                                <h2 className="text-xl mb-2">
                                    {question.question}
                                </h2>
                                {question.type === "single" ? (
                                    <div>
                                        {question.options.map((option, idx) => (
                                            <div key={idx}>
                                                <input
                                                    type="radio"
                                                    id={`q${index}o${idx}`}
                                                    name={`question${index}`}
                                                    value={option}
                                                    onChange={(e) => {
                                                        handleOptionChange(
                                                            index,
                                                            option,
                                                            false,
                                                            true
                                                        );
                                                    }}
                                                />
                                                <label
                                                    htmlFor={`q${index}o${idx}`}
                                                >
                                                    {option}
                                                </label>
                                            </div>
                                        ))}
                                    </div>
                                ) : (
                                    <div>
                                        {question.options.map((option, idx) => (
                                            <div key={idx}>
                                                <input
                                                    type="checkbox"
                                                    id={`q${index}o${idx}`}
                                                    name={`question${index}`}
                                                    value={option}
                                                    onChange={(e) => {
                                                        if (e.target.checked) {
                                                            handleOptionChange(
                                                                index,
                                                                option,
                                                                true,
                                                                true
                                                            );
                                                        } else {
                                                            handleOptionChange(
                                                                index,
                                                                option,
                                                                true,
                                                                false
                                                            );
                                                        }
                                                    }}
                                                />
                                                <label
                                                    htmlFor={`q${index}o${idx}`}
                                                >
                                                    {option}
                                                </label>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        ))}
                        <button
                            className="bg-blue-500 text-white px-4 py-2 rounded"
                            onClick={handleSubmit}
                        >
                            Submit Quiz
                        </button>
                    </div>
                </>
            ) : (
                <>
                    <Navbar />
                    <div className="p-8 text-center text-xl text-customBlueDark">
                        Quiz is now loading... <br />
                        Please wait warmly and have some tea.
                    </div>
                    <div className="flex justify-center">
                        <img
                            src="https://64.media.tumblr.com/3c197c3b5ff6680e889317b993211add/71238fd72a401992-92/s400x600/b412ebae6f0edabaefda718f8898fb8a4a1b7155.png"
                            alt="Reimu Hakurei from Touhou 6"
                            style={{
                                marginTop: "20px",
                                width: "200px",
                                height: "auto",
                            }}
                        />
                    </div>
                </>
            )}
        </>
    );
};

export default PlayQuiz;
