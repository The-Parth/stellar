import React, { useState } from "react";
import axios from "axios";

import { backendUrl } from "../../config";

const newQuestion = ({ quizId, user }) => {
    const [question, setQuestion] = useState("");
    const [type, setType] = useState("single");
    const [options, setOptions] = useState([]);
    const [answer, setAnswer] = useState([]);

    const handleAddQuestion = async () => {
        try {
            const response = await axios.post(
                `${backendUrl}/api/quiz/question/create`,
                {
                    question,
                    type,
                    options,
                    answer,
                },
                {
                    headers: {
                        "content-type": "application/json",
                        "auth-token": user.token,
                    },
                }
            );
            const newQuestion = response.data;

            await axios.post(
                `${backendUrl}/api/quiz/${quizId}/add`,
                {
                    questionId: newQuestion.id,
                },
                {
                    headers: {
                        "content-type": "application/json",
                        "auth-token": user.token,
                    },
                }
            );

            alert("Question added to quiz successfully!");
            // reload the component
            window.location.reload();
        } catch (error) {
            console.error("Error adding question to quiz:", error);
            alert("Failed to add question to quiz.");
        }
    };

    return (
        <div className="max-w-lg mx-auto p-6 bg-white rounded-lg shadow-md">
            <h2 className="text-2xl font-bold mb-4">Add New Question</h2>
            <div className="mb-4">
                <label className="block text-gray-700">Question:</label>
                <input
                    type="text"
                    value={question}
                    onChange={(e) => setQuestion(e.target.value)}
                    className="w-full px-3 py-2 border rounded-lg"
                />
            </div>
            <div className="mb-4">
                <label className="block text-gray-700">Type:</label>
                <select
                    value={type}
                    onChange={(e) => setType(e.target.value)}
                    className="w-full px-3 py-2 border rounded-lg"
                >
                    <option value="single">Single Choice</option>
                    <option value="multiple">Multiple Choice</option>
                </select>
            </div>
            <div className="mb-4">
                <label className="block text-gray-700">Options:</label>
                {options.map((option, index) => (
                    <div key={index} className="flex items-center mb-2">
                        <input
                            type="text"
                            value={option}
                            onChange={(e) => {
                                const newOptions = [...options];
                                newOptions[index] = e.target.value;
                                setOptions(newOptions);
                            }}
                            className="w-full px-3 py-2 border rounded-lg"
                        />
                        <button
                            onClick={() => {
                                const newOptions = options.filter(
                                    (_, i) => i !== index
                                );
                                setOptions(newOptions);
                            }}
                            className="ml-2 px-3 py-2 bg-red-500 text-white rounded-lg"
                        >
                            Remove
                        </button>
                    </div>
                ))}
                <button
                    onClick={() => setOptions([...options, ""])}
                    className="mt-2 px-3 py-2 bg-blue-500 text-white rounded-lg"
                >
                    Add Option
                </button>
            </div>
            <div className="mb-4">
                <label className="block text-gray-700">Answer:</label>
                {type === "single" ? (
                    <select
                        value={answer[0]}
                        onChange={(e) => setAnswer([e.target.value])}
                        className="w-full px-3 py-2 border rounded-lg"
                    >
                        {options.map((option, index) => (
                            <option key={index} value={option}>
                                {option}
                            </option>
                        ))}
                    </select>
                ) :

                (<div>
                    {options.map((option, index) => (
                        <div key={index} className="flex items-center mb-2">
                            <input
                                type="checkbox"
                                checked={answer.includes(option)}
                                onChange={(e) => {
                                    const newAnswer = e.target.checked
                                        ? [...answer, option]
                                        : answer.filter(
                                              (ans) => ans !== option
                                          );
                                    setAnswer(newAnswer);
                                }}
                                className="mr-2"
                            />
                            <span>{option}</span>
                        </div>
                    ))}
                </div>)}
            </div>
            <button
                onClick={handleAddQuestion}
                className="w-full px-3 py-2 bg-green-500 text-white rounded-lg"
            >
                Add Question to Quiz
            </button>
        </div>
    );
};

export default newQuestion;
