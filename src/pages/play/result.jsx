import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import Navbar from "../../components/Navbar";

import { backendUrl } from "../../config";

const ResultPage = () => {
    const { attemptId } = useParams();
    const navigate = useNavigate();
    const [score, setScore] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [firstAttempt, setFirstAttempt] = useState(null);
    const [attemptTime, setAttemptTime] = useState(null);

    const token = localStorage.getItem("token");

    const [quiz, setQuiz] = useState(null);

    const fetchQuiz = (quizId) => {
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
                }, 1000);
                console.log(response.data);
            })
            .catch((error) => {
                console.log(error);
            });
    };

    useEffect(() => {
        const fetchScore = async () => {
            try {
                const response = await axios.get(
                    `${backendUrl}/api/play/attempt/${attemptId}`
                );
                console.log(response.data);
                setScore(response.data.finalScore);
                setFirstAttempt(response.data.isFirstAttempt);

                const date = new Date(response.data.attemptedAt);
                const options = {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                };
                const formattedDate = date.toLocaleDateString(
                    undefined,
                    options
                );
                const formattedTime = date.toLocaleTimeString(undefined, {
                    hour: "2-digit",
                    minute: "2-digit",
                    second: "2-digit",
                });
                const timeZone =
                    Intl.DateTimeFormat().resolvedOptions().timeZone;
                setAttemptTime(
                    `${formattedDate} at ${formattedTime} (${timeZone})`
                );

                fetchQuiz(response.data.quizId);
            } catch (err) {
                setError(err.message);
            }
        };

        fetchScore();
    }, [attemptId]);

    const handleGoToLeaderboard = () => {
        navigate("/leaderboard/" + quiz.quiz_id);
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center h-screen">
                <div className="text-xl">Loading...</div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex justify-center items-center h-screen">
                <div className="text-xl text-red-500">Error: {error}</div>
            </div>
        );
    }

    return (
        <>
            <Navbar />
            <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4 overflow-hidden">
                <div className="bg-white shadow-md rounded-lg p-6 max-w-md w-full -translate-y-12">
                    <h1 className="text-2xl font-bold mb-4 text-center">
                        Result for Attempt ID: {attemptId}
                        {quiz && <span> on Quiz: {quiz.title}</span>}
                    </h1>
                    <p className="text-lg mb-2">
                        <span className="font-semibold">Your Score:</span>{" "}
                        {score}
                    </p>
                    <p className="text-lg mb-2">
                        <span className="font-semibold">Attempt Time:</span>{" "}
                        {attemptTime}
                    </p>
                    <p className="text-lg mb-2">
                        <span className="font-semibold">
                            {firstAttempt
                                ? "First Attempt"
                                : "Not First Attempt"}
                        </span>
                    </p>
                    {quiz && (
                        <p className="text-xs text-gray-300 text-center mt-4">
                            Quiz ID: {quiz.quiz_id}
                        </p>
                    )}
                    <button
                        onClick={handleGoToLeaderboard}
                        className="mt-6 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full w-full transition duration-300"
                    >
                        Go to Leaderboard
                    </button>
                </div>
            </div>
        </>
    );
};

export default ResultPage;