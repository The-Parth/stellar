import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

import { backendUrl } from "../../config";

import Navbar from "../../components/Navbar";

const PlayQuiz = () => {
    const { quizId } = useParams();
    const [quiz, setQuiz] = useState(null);
    const [score, setScore] = useState(0);

    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);

    const token = localStorage.getItem("token");

    const handleOptionChange = (
        questionIndex,
        option,
        isMultiple = false,
        isChecked = true
    ) => {
        const newQuestions = [...quiz.questions];
        const currentQuestion = newQuestions[questionIndex];

        if (!currentQuestion.selectedOptions) {
            currentQuestion.selectedOptions = [];
        }

        if (isMultiple) {
            if (isChecked) {
                currentQuestion.selectedOptions.push(option);
            } else {
                currentQuestion.selectedOptions =
                    currentQuestion.selectedOptions.filter(
                        (selectedOption) => selectedOption !== option
                    );
            }
        } else {
            currentQuestion.selectedOptions = [option];
        }

        newQuestions[questionIndex] = currentQuestion;
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
                        <h1 className="text-2xl font-bold mb-4 text-center">
                            {quiz.title}
                        </h1>
                        <p className="text-lg mb-6 text-center">
                            {quiz.description}
                        </p>
                        {quiz.questions.map((question, index) => (
                            <div key={index} className="mb-6 p-2">
                                <div className="flex justify-between items-start p-3">
                                    <div className="flex-1">
                                        <h2 className="text-lg mb-1 font-semibold">
                                            Q{index + 1}: {question.question}
                                        </h2>
                                        <p className="text-sm text-gray-500">
                                            {question.type === "single"
                                                ? "Single"
                                                : "Multiple"}{" "}
                                            choice
                                        </p>
                                    </div>
                                    <span className="text-lg mb-1 font-regular w-32 text-right">
                                        Points: {question.points}
                                    </span>
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 justify-items-center">
                                    {question.options.map((option, idx) => (
                                        <div
                                            key={idx}
                                            className={`p-4 border rounded cursor-pointer w-full max-w-xs ${
                                                question.selectedOptions?.includes(
                                                    option
                                                )
                                                    ? "bg-customBlueLight text-white shadow-lg transform scale-105 transition-all duration-300"
                                                    : "border-customBlueLight scale-100 transition-all duration-300 transform hover:shadow-lg hover:scale-105"
                                            }`}
                                            style={{ maxWidth: "250px" }}
                                            onClick={() => {
                                                if (
                                                    question.type === "single"
                                                ) {
                                                    handleOptionChange(
                                                        index,
                                                        option,
                                                        false,
                                                        true
                                                    );
                                                } else {
                                                    const isChecked =
                                                        !question.selectedOptions?.includes(
                                                            option
                                                        );
                                                    handleOptionChange(
                                                        index,
                                                        option,
                                                        true,
                                                        isChecked
                                                    );
                                                }
                                            }}
                                        >
                                            <input
                                                type={
                                                    question.type === "single"
                                                        ? "radio"
                                                        : "checkbox"
                                                }
                                                id={`q${index}o${idx}`}
                                                name={`question${index}`}
                                                value={option}
                                                checked={
                                                    question.selectedOptions?.includes(
                                                        option
                                                    ) || false
                                                }
                                                onChange={() => {}}
                                                className="hidden"
                                            />
                                            <label
                                                htmlFor={`q${index}o${idx}`}
                                                className={`cursor-pointer flex items-center w-max h-max p-0 m-0 ${
                                                    question.selectedOptions?.includes(
                                                        option
                                                    )
                                                        ? "font-bold"
                                                        : ""
                                                }`}
                                            >
                                                <span
                                                    className={`w-6 h-6 mr-2 rounded-full border border-customBlueLight flex items-center justify-center ${
                                                        question.selectedOptions?.includes(
                                                            option
                                                        )
                                                            ? "border-white"
                                                            : ""
                                                    }`}
                                                >
                                                    {String.fromCharCode(
                                                        65 + idx
                                                    )}
                                                </span>
                                                {option}
                                            </label>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ))}
                        <button
                            className="bg-customBlue text-white px-4 py-2 rounded font-bold mx-auto block hover:bg-customBlueDark hover:shadow-lg transform hover:scale-105 transition-all duration-300"
                            onClick={handleSubmit}
                        >
                            Submit Quiz
                        </button>
                    </div>
                </>
            ) : (
                <>
                    <Navbar />
                    <div className="p-8 text-center text-xl text-customBlueLightDark">
                        Quiz is now loading... <br />
                        Please wait warmly and have some tea.
                    </div>
                </>
            )}
        </>
    );
};

export default PlayQuiz;
