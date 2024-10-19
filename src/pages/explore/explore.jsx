import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Navbar from "../../components/Navbar";
import axios from "axios";

import { FaTag, FaTachometerAlt } from "react-icons/fa";

import { backendUrl } from "../../config";

const Explore = () => {
    const [quizzes, setQuizzes] = useState([]);
    const [loading, setLoading] = useState(true);

    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    useEffect(() => {
        const totalPages = () => {
            axios
                .get(`${backendUrl}/api/quiz/list/0`)
                .then((response) => {
                    setTotalPages(Math.ceil(response.data.count / 10));
                })
                .catch((error) => {
                    console.log(error);
                });
        };
        totalPages();
    }, []);

    useEffect(() => {
        const fetchQuizzes = () => {
            axios
                .get(`${backendUrl}/api/quiz/list/${page}`)
                .then((response) => {
                    setQuizzes(response.data);
                    setLoading(false);
                    console.log(quizzes);
                })
                .catch((error) => {
                    console.log(error);
                });
        };
        fetchQuizzes();
    }, [page, totalPages]);

    return (
        <div>
            <Navbar />
            <div className="p-8">
                <h1 className="text-4xl font-bold mb-4">Explore Page</h1>
                <p className="text-lg">
                    Welcome to the explore page. Here you can find various
                    resources and information.
                </p>
                {loading ? (
                    <p>Loading...</p>
                ) : (
                    <div>
                        {quizzes.map((quiz) => (
                            <div
                                key={quiz.id}
                                className="relative border p-4 rounded-md shadow-sm bg-white hover:shadow-lg transition duration-150 ease-in-out"
                            >
                                <div className="flex flex-row md:justify-between">
                                    <div>
                                        <h3 className="text-lg font-bold mb-2">
                                            {quiz.title}
                                        </h3>
                                        <p className="text-sm text-gray-600 mb-2">
                                            {quiz.description}
                                        </p>
                                        <p className="text-sm text-gray-600">
                                            {quiz.questions.length} questions
                                        </p>
                                        <p className="text-sm text-gray-600">
                                            Author: {quiz.author}
                                        </p>
                                        <p className="text-sm text-gray-600">
                                            Duration: {quiz.duration} minutes
                                        </p>
                                    </div>

                                    <div className="flex flex-col md:flex-row items-center md:space-x-4 mt-5 md:mt-0">
                                        <div className="flex items-center space-x-2 mb-2 md:mb-0">
                                            <FaTag className="text-gray-500" />
                                            <span className="hidden md:inline text-sm text-gray-600">
                                                Category:
                                            </span>
                                            <span className="md:inline text-sm font-medium text-blue-600">
                                                {quiz.category}
                                            </span>
                                        </div>
                                        <div className="flex items-center space-x-2">
                                            <FaTachometerAlt className="text-gray-500" />
                                            <span className="hidden md:inline text-sm text-gray-600">
                                                Difficulty:
                                            </span>
                                            <span
                                                className={`md:inline text-sm font-medium ${
                                                    quiz.difficulty === "hard"
                                                        ? "text-red-600"
                                                        : quiz.difficulty ===
                                                          "medium"
                                                        ? "text-yellow-600"
                                                        : "text-green-600"
                                                }`}
                                            >
                                                {quiz.difficulty === "hard"
                                                    ? "Hard"
                                                    : quiz.difficulty ===
                                                      "medium"
                                                    ? "Medium"
                                                    : "Easy"}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                                
                                <Link
                                    to={`/play/${quiz.id}`}
                                    className="bottom-4 left-4 bg-blue-500 hover:bg-blue-700 text-white text-xs px-2 py-1 rounded-md transition duration-150 ease-in-out"
                                >
                                    Play Quiz
                                </Link>
                                
                            </div>
                        ))}
                        <div className="my-4">
                            {page > 1 && (
                                <button
                                    onClick={() => setPage(page - 1)}
                                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                                >
                                    Previous
                                </button>
                            )}
                            {page < totalPages && (
                                <button
                                    onClick={() => setPage(page + 1)}
                                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                                >
                                    Next
                                </button>
                            )}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Explore;
