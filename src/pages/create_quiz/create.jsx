import React, { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { backendUrl } from "../../config";
import { UserContext } from "../../context/userContext";
import Navbar from "../../components/Navbar";

const difficulties = [
    { value: "easy", label: "Easy" },
    { value: "medium", label: "Medium" },
    { value: "hard", label: "Hard" },
];

const CreateQuiz = () => {
    const { user, loading, setLoading } = useContext(UserContext);
    const [quizName, setQuizName] = useState("");
    const [description, setDescription] = useState("");
    const [tags, setTags] = useState("");
    const [category, setCategory] = useState("");
    const [difficulty, setDifficulty] = useState("easy");
    const navigate = useNavigate();

    const token = localStorage.getItem("token");

    // check if user is logged in
    useEffect(() => {
        if (!token) {
            navigate("/login");
        }
    }, [token]);

    const handleCreateQuiz = async () => {
        var start = new Date().getTime();
        while (loading) {
            if (new Date().getTime() - start > 10000) {
                console.error("Timeout");
                break;
            }
        }
        try {
            axios
                .post(
                    `${backendUrl}/api/quiz/create`,
                    {
                        title: quizName,
                        description,
                        tags,
                        category,
                        difficulty,
                    },
                    {
                        headers: {
                            "content-type": "application/json",
                            "auth-token": user.token,
                        },
                    }
                )
                .then((response) => {
                    const quizId = response.data.quiz_id;
                    console.log(response.data);
                    navigate(`/edit_quiz/${quizId}`);
                });
        } catch (error) {
            console.error("Error creating quiz:", error);
        }
    };

    return (
        <>
            <Navbar />
            <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
                <div className="sm:mx-auto sm:w-full sm:max-w-md">
                    <h1 className="text-center text-3xl font-bold leading-9 tracking-tight text-gray-900">
                        Create Quiz
                    </h1>
                </div>
                <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
                    <div className="bg-white py-8 px-6 shadow rounded-lg sm:px-10">
                        <form className="space-y-6">
                            <div>
                                <label
                                    htmlFor="quizName"
                                    className="block text-sm font-medium text-gray-700"
                                >
                                    Quiz Name
                                </label>
                                <div className="mt-1">
                                    <input
                                        id="quizName"
                                        name="quizName"
                                        type="text"
                                        required
                                        value={quizName}
                                        onChange={(e) =>
                                            setQuizName(e.target.value)
                                        }
                                        className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                    />
                                </div>
                            </div>
                            <div>
                                <label
                                    htmlFor="description"
                                    className="block text-sm font-medium text-gray-700"
                                >
                                    Description
                                </label>
                                <div className="mt-1">
                                    <input
                                        id="description"
                                        name="description"
                                        type="text"
                                        required
                                        value={description}
                                        onChange={(e) =>
                                            setDescription(e.target.value)
                                        }
                                        className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                    />
                                </div>
                            </div>
                            <div>
                                <label
                                    htmlFor="tags"
                                    className="block text-sm font-medium text-gray-700"
                                >
                                    Tags
                                </label>
                                <div className="mt-1">
                                    <input
                                        id="tags"
                                        name="tags"
                                        type="text"
                                        required
                                        value={tags}
                                        onChange={(e) =>
                                            setTags(e.target.value)
                                        }
                                        className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                    />
                                </div>
                            </div>
                            <div>
                                <label
                                    htmlFor="category"
                                    className="block text-sm font-medium text-gray-700"
                                >
                                    Category
                                </label>
                                <div className="mt-1">
                                    <input
                                        id="category"
                                        name="category"
                                        type="text"
                                        required
                                        value={category}
                                        onChange={(e) =>
                                            setCategory(e.target.value)
                                        }
                                        className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                    />
                                </div>
                            </div>
                            <div>
                                <label
                                    htmlFor="difficulty"
                                    className="block text-sm font-medium text-gray-700"
                                >
                                    Difficulty
                                </label>
                                <div className="mt-1">
                                    <select
                                        id="difficulty"
                                        name="difficulty"
                                        required
                                        value={difficulty}
                                        onChange={(e) =>
                                            setDifficulty(e.target.value)
                                        }
                                        className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                    >
                                        {difficulties.map((option) => (
                                            <option
                                                key={option.value}
                                                value={option.value}
                                            >
                                                {option.label}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            </div>
                            <div>
                                <button
                                    type="button"
                                    onClick={handleCreateQuiz}
                                    className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                                >
                                    Create Quiz
                                </button>
                            </div>
                        </form>
                    </div>
                </div>

                <div className="mt-6 text-center text-sm text-gray-600">
                    <p>
                        Want to edit an existing quiz?{" "}
                        <a
                            href="/dashboard"
                            className="font-medium text-blue-600 hover:text-blue-500"
                        >
                            Go to Dashboard
                        </a>
                    </p>
                </div>

                <div className="mt-6 text-center text-sm text-gray-300">
                    <p>
                        <a
                            href="/"
                            className="font-medium text-gray-300 hover:text-gray-400"
                        >
                            By creating a quiz, you agree to our Terms of
                            Service
                        </a>
                    </p>
                </div>
            </div>
        </>
    );
};

export default CreateQuiz;
