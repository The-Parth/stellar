import { React, useState, useEffect, useContext } from "react";
import axios from "axios";
import NewQuestion from "../../components/newq/newq"; // Correct import
import { UserContext } from "../../context/userContext";
import { backendUrl } from "../../config";
import { useParams } from "react-router-dom"; // Import useParams
import Navbar from "../../components/Navbar";
import { set } from "mongoose";

const EditQuiz = () => {
    const { quizId } = useParams(); // Destructure quizId from useParams
    const { user, loading, setLoading } = useContext(UserContext);

    var varvar = 0;

    const [quizName, setQuizName] = useState("");
    const [description, setDescription] = useState("");
    const [tags, setTags] = useState("");
    const [category, setCategory] = useState("");
    const [difficulty, setDifficulty] = useState("");
    const [questions, setQuestions] = useState([]);
    const [newQuestion, setNewQuestion] = useState(false);
    const [published, setPublished] = useState(false);
    const [publishing, setPublishing] = useState(false);

    const saveQuiz = async () => {
        try {
            const response = await axios.patch(
                `${backendUrl}/api/quiz/${quizId}`,
                {
                    title: quizName,
                    description,
                    tags,
                    category,
                    difficulty,
                    questions,
                },
                {
                    headers: {
                        "content-type": "application/json",
                        "auth-token": user.token,
                    },
                }
            );
            console.log(response.data);
        } catch (error) {
            console.error("Error saving quiz:", error);
        }
    };

    useEffect(() => {
        const fetchQuiz = async () => {
            try {
                const response = await axios.get(
                    `${backendUrl}/api/quiz/${quizId}`,
                    {
                        headers: {
                            "content-type": "application/json",
                            "auth-token": user.token,
                        },
                    }
                );
                const quiz = response.data;
                console.log(quiz);
                setQuizName(quiz.title);
                setDescription(quiz.description);
                setTags(quiz.tags);
                setCategory(quiz.category);
                setDifficulty(quiz.difficulty);
                setQuestions(quiz.questions);
                setPublished(quiz.isPublished);

                console.log(quiz);
            } catch (error) {
                console.error("Error fetching quiz:", error);
                alert("Quiz not found");
            }
        };

        fetchQuiz();
    }, [quizId, user.token]);

    const publishQuiz = async () => {
        setPublished(!published);
        setPublishing(true);
        setTimeout(() => setPublishing(false), 2000);
        try {
            const response = await axios.patch(
                `${backendUrl}/api/quiz/${quizId}/publish`,
                {
                    published: !published,
                },
                {
                    headers: {
                        "content-type": "application/json",
                        "auth-token": user.token,
                    },
                }
            );
            console.log(response.data);
            setPublished(response.data.isPublished);
        } catch (error) {
            console.error("Error publishing quiz:", error);
        }
    };

    const deleteQuestion = async (questionId) => {
        try {
            const response = await axios.delete(
                `${backendUrl}/api/quiz/${quizId}/question/${questionId}`,
                {
                    headers: {
                        "content-type": "application/json",
                        "auth-token": user.token,
                    },
                }
            );
            console.log(response.data);
            setQuestions(
                questions.filter((question) => question.id !== questionId)
            );
        } catch (error) {
            console.error("Error deleting question:", error);
        }
    };
    return (
        <>
            <Navbar />
            <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8 bg-gray-100">
                <div className="sm:mx-auto sm:w-full sm:max-w-lg">
                    <h1 className="text-center text-3xl font-bold leading-9 tracking-tight text-gray-900 mb-4">
                        Edit Quiz
                    </h1>
                    <p
                        className={`text-center text-sm ${
                            published ? "text-green-500" : "text-red-500"
                        } mb-4`}
                    >
                        {publishing ? (
                            published ? (
                                "Publishing..."
                            ) : (
                                "Unpublishing..."
                            )
                        ) : (
                            <>
                                <span>
                                    {published ? "Published" : "Not Published"}
                                </span>
                                <button
                                    className="ml-2 text-xs text-white bg-customBlue hover:bg-customBlueDark px-2 py-1 rounded"
                                    onClick={() => publishQuiz()}
                                >
                                    {published ? "Unpublish" : "Publish"}
                                </button>
                            </>
                        )}
                    </p>
                </div>
                <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-lg">
                    <div className="bg-white py-8 px-6 shadow rounded-lg sm:px-10">
                        <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-700">
                                Quiz Name
                            </label>
                            <input
                                type="text"
                                value={quizName}
                                onChange={(e) => setQuizName(e.target.value)}
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-700">
                                Description
                            </label>
                            <textarea
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-700">
                                Tags
                            </label>
                            <input
                                type="text"
                                value={tags}
                                onChange={(e) => setTags(e.target.value)}
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-700">
                                Category
                            </label>
                            <input
                                type="text"
                                value={category}
                                onChange={(e) => setCategory(e.target.value)}
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-700">
                                Difficulty
                            </label>
                            <select
                                value={difficulty}
                                onChange={(e) => setDifficulty(e.target.value)}
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            >
                                <option value="easy">Easy</option>
                                <option value="medium">Medium</option>
                                <option value="hard">Hard</option>
                            </select>
                        </div>
                        <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-700">
                                Questions
                            </label>
                            <ul className="list-disc pl-5">
                                {questions.map((question, index) =>
                                    question && !question.error ? (
                                        <>
                                            <li key={index} className="mb-2">
                                                <div className="flex flex-row justify-between items-center">
                                                    <div className="font-bold">
                                                        {question.question}
                                                    </div>
                                                    <button
                                                        className="mt-0 text-xs text-white bg-red-500 hover:bg-red-700 px-2 py-1 rounded"
                                                        onClick={() =>
                                                            deleteQuestion(
                                                                question.id
                                                            )
                                                        }
                                                    >
                                                        Delete
                                                    </button>
                                                </div>
                                                <ul className="list-disc pl-5">
                                                    {question.options.map(
                                                        (option, idx) => (
                                                            <li key={idx}>
                                                                {option}
                                                            </li>
                                                        )
                                                    )}
                                                </ul>
                                                <div className="italic">
                                                    Answer:{" "}
                                                    {question.answer.join(", ")}
                                                </div>
                                            </li>
                                        </>
                                    ) : (
                                        <li
                                            key={index}
                                            className="relative mb-2 p-4 border rounded-md shadow-sm bg-white"
                                        >
                                            <div className="font-bold">
                                                Question not found
                                            </div>
                                            <div className="italic">
                                                The question may have been
                                                deleted, or there was an error
                                                fetching the question. Please
                                                try again if you think this is
                                                an error.
                                            </div>
                                            <button
                                                onClick={() =>
                                                    deleteQuestion(question.id)
                                                }
                                                className="absolute bottom-4 right-4 bg-red-600 text-white text-xs px-2 py-1 rounded-md hover:bg-red-700 transition duration-150 ease-in-out"
                                            >
                                                Delete
                                            </button>
                                        </li>
                                    )
                                )}
                            </ul>
                        </div>
                        <div className="mt-8">
                            <button
                                className="w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-customBlue hover:bg-customBlueDark"
                                onClick={saveQuiz}
                            >
                                Save
                            </button>
                        </div>
                    </div>
                </div>
                <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
                    <button
                        className="mt-4 w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-customBlue hover:bg-customBlueDark"
                        onClick={() => setNewQuestion(true)}
                    >
                        Add Question
                    </button>
                    {newQuestion && <NewQuestion quizId={quizId} user={user} />}
                </div>
            </div>
            <div className="text-center text-xs text-gray-400 mt-4">
                Quiz ID: {quizId}
            </div>
        </>
    );
};

export default EditQuiz;
