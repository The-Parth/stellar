import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

import { backendUrl } from "../../config";

import Navbar from "../../components/Navbar";

const PlayQuiz = () => {
    const { quizId } = useParams();
    const [quiz, setQuiz] = useState(null);
    const [score, setScore] = useState(0);

    const [timer, setTimer] = useState(-1);

    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);

    const token = localStorage.getItem("token");

    if (!quizId) {
        navigate("/explore");
    }

    if (!token) {
        navigate("/login");
    }

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
                navigate(`/result/${response.data.attemptId}`);
            })
            .catch((error) => {
                console.log(error);
            });
    };

    // implement timer
    useEffect(() => {
        if (timer === -1) {
            return;
        }
        if (timer === 0) {
            console.log("Time's up!");
        }
        const interval = setInterval(() => {
            console.log(timer);
            setTimer(timer - 1);
        }, 1000);
        return () => clearInterval(interval);
    }, [timer]);

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
                    console.log(response.data);

                    setTimeout(() => {
                        setLoading(false);
                        if (response.data.duration > 0) {
                            setTimer(response.data.duration * 60);
                        }
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
                                            className={`p-4 border rounded cursor-pointer break-words whitespace-pre-line relative w-full md:w-[300px]
                ${
                    question.selectedOptions?.includes(option)
                        ? "bg-customBlueLight text-white shadow-lg transform scale-105 transition-all duration-300"
                        : "border-customBlueLight scale-100 transition-all duration-300 transform hover:shadow-lg hover:scale-105"
                }`}
                                            style={{
                                                maxWidth: "100%",
                                                minWidth: "250px",
                                                wordWrap: "break-word",
                                            }} // Allow word wrapping and dynamic width
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
                                            <div
                                                style={{
                                                    position: "absolute",
                                                    top: 0,
                                                    left: 0,
                                                    width: "100%",
                                                    height: "100%",
                                                    zIndex: 10,
                                                    backgroundColor:
                                                        "transparent",
                                                }}
                                            ></div>

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
                                                className={`cursor-pointer flex items-start w-full break-words whitespace-pre-line 
                    ${
                        question.selectedOptions?.includes(option)
                            ? "font-bold"
                            : ""
                    }`}
                                            >
                                                <span
                                                    className={`w-6 h-6 mr-2 rounded-full border border-customBlueLight flex items-center justify-center 
                        ${
                            question.selectedOptions?.includes(option)
                                ? "border-white"
                                : ""
                        }`}
                                                >
                                                    {String.fromCharCode(
                                                        65 + idx
                                                    )}
                                                </span>
                                                <div className="flex-1 break-words text-left">
                                                    {option}
                                                </div>
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
