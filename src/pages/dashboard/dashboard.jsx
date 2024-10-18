import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { UserContext } from "../../context/userContext";
import { backendUrl } from "../../config";
import { useNavigate } from "react-router-dom";
import { FaTag, FaTachometerAlt } from "react-icons/fa";
import Navbar from "../../components/Navbar";

const Dashboard = () => {
    const { user, setUser, loading, setLoading } = useContext(UserContext);
    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState({
        username: user.username,
        email: user.email,
        name: user.name,
    });

    const [quiz, setQuiz] = useState({});
    const navigate = useNavigate();

    const token = localStorage.getItem("token");

    useEffect(() => {
        if (!token) {
            navigate("/login");
        }

        if (loading) {
            return;
        }

        const fetchQuiz = async () => {
            try {
                const response = await axios.get(
                    `${backendUrl}/api/quiz/user/${user.username}`,
                    {
                        headers: {
                            "content-type": "application/json",
                            "auth-token": user.token,
                        },
                    }
                );
                console.log("Quiz data:", response.data);
                setQuiz(response.data);
            } catch (error) {
                console.error("Error fetching quiz data:", error);
            }
        };

        const fetchUser = async () => {
            console.log("token", user.token);
            try {
                const response = await axios.post(
                    `${backendUrl}/api/auth/getuser`,
                    {},
                    {
                        headers: {
                            "content-type": "application/json",
                            "auth-token": user.token,
                        },
                    }
                );
                console.log("User data:", response.data);
                setUser(
                    (prevUser) => ({
                        ...prevUser,
                        ...response.data,
                    }),
                    setLoading(false)
                );
            } catch (error) {
                console.error("Error fetching user data:", error);
            }
        };

        fetchUser();
        fetchQuiz();
    }, [loading]);

    useEffect(() => {
        setFormData({
            username: user.username,
            email: user.email,
            name: user.name,
            oldPassword: "",
            newPassword: "",
            confirmPassword: "",
        });
    }, [user]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleEdit = () => {
        setIsEditing(true);
    };

    const handleSave = () => {
        setUser(formData);

        if (formData.newPassword !== formData.confirmPassword) {
            return;
        }

        if (formData.oldPassword == "") {
            alert("Old password is required");
            return;
        }

        const saveUser = async () => {
            try {
                var datatoput = {
                    username: formData.username,
                    email: formData.email,
                    name: formData.name,
                    oldPassword: formData.oldPassword,
                };

                if (formData.newPassword !== "") {
                    datatoput.newPassword = formData.newPassword;
                }
                const response = await axios.put(
                    `${backendUrl}/api/auth/update`,
                    datatoput,
                    {
                        headers: {
                            "content-type": "application/json",
                            "auth-token": user.token,
                        },
                    }
                );
                console.log("User updated:", response.data);
                setUser(response.data);
            } catch (error) {
                console.error("Error updating user:", error);
            }
        };

        saveUser().then(() => {
            // reload the page
            window.location.reload();
        });
    };

    return (
        <> <Navbar />
        <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8 bg-gray-50">
            <div className="sm:mx-auto sm:w-full sm:max-w-lg lg:max-w-4xl">
                <h1 className="text-center text-3xl font-bold leading-9 tracking-tight text-blue-600 mb-6">
                    Dashboard
                </h1>
                <h2 className="text-xl font-semibold leading-9 tracking-tight text-gray-900 mb-4">
                    Profile
                </h2>
                {isEditing ? (
                    <div className="space-y-6">
                        <label className="block">
                            Username:
                            <input
                                type="text"
                                name="username"
                                value={formData.username}
                                onChange={handleChange}
                                className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                            />
                        </label>
                        <label className="block">
                            Email:
                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                            />
                        </label>
                        <label className="block">
                            Name:
                            <input
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                            />
                        </label>
                        <label className="block">
                            Old Password:
                            <input
                                type="password"
                                name="oldPassword"
                                value={formData.oldPassword}
                                onChange={handleChange}
                                className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                            />
                        </label>
                        <label className="block">
                            New Password:
                            <input
                                type="password"
                                name="newPassword"
                                value={formData.newPassword}
                                onChange={handleChange}
                                className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                            />
                        </label>
                        <label className="block">
                            Confirm Password:
                            <input
                                type="password"
                                name="confirmPassword"
                                value={formData.confirmPassword}
                                onChange={handleChange}
                                className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                            />
                        </label>
                        <span
                            className={`text-sm ${
                                formData.newPassword !==
                                formData.confirmPassword
                                    ? "text-red-500"
                                    : "text-green-500"
                            }`}
                        >
                            {formData.newPassword !== formData.confirmPassword
                                ? "Passwords do not match"
                                : "Passwords match"}
                        </span>
                        <button
                            onClick={handleSave}
                            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition duration-150 ease-in-out"
                        >
                            Save
                        </button>
                    </div>
                ) : (
                    <div className="space-y-4">
                        <p className="text-lg">Username: {user.username}</p>
                        <p className="text-lg">Email: {user.email}</p>
                        <p className="text-lg">Name: {user.name}</p>
                        <button
                            onClick={handleEdit}
                            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition duration-150 ease-in-out"
                        >
                            Edit
                        </button>
                    </div>
                )}
            </div>
            <div className="mt-8">
                <h2 className="text-xl font-semibold leading-9 tracking-tight text-gray-900 mb-4">
                    Your Quizzes
                </h2>
                {quiz.length > 0 ? (
                    <ul className="space-y-4">
                        {quiz.map((q) => (
                            <li
                                key={q._id}
                                className="border p-4 rounded-md shadow-sm bg-white hover:shadow-lg transition duration-150 ease-in-out"
                                onClick={() =>
                                    navigate(`/edit_quiz/${q.quiz_id}`)
                                }
                            >
                                <div className="flex flex-col md:flex-row md:justify-between">
                                    <div>
                                        <h3 className="text-lg font-bold mb-2">
                                            {q.title}
                                        </h3>
                                        <p className="text-sm text-gray-600 mb-2">
                                            {q.description}
                                        </p>
                                        <p className="text-sm text-gray-600">
                                            {q.questions.length} questions
                                        </p>
                                    </div>

                                    <div className="flex flex-col md:flex-row md:items-center md:space-x-4">
                                        <div className="flex items-center space-x-2 mb-2 md:mb-0">
                                            <FaTag className="text-gray-500" />
                                            <span className="text-sm text-gray-600">
                                                Category:
                                            </span>
                                            <span className="text-sm font-medium text-blue-600">
                                                {q.category}
                                            </span>
                                        </div>
                                        <div className="flex items-center space-x-2">
                                            <FaTachometerAlt className="text-gray-500" />
                                            <span className="text-sm text-gray-600">
                                                Difficulty:
                                            </span>
                                            <span
                                                className={`text-sm font-medium ${
                                                    q.difficulty === "hard"
                                                        ? "text-red-600"
                                                        : q.difficulty ===
                                                          "medium"
                                                        ? "text-yellow-600"
                                                        : "text-green-600"
                                                }`}
                                            >
                                                {q.difficulty === "hard"
                                                    ? "Hard"
                                                    : q.difficulty === "medium"
                                                    ? "Medium"
                                                    : "Easy"}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p className="text-sm text-gray-600">
                        You have not created any quizzes yet.
                    </p>
                )}
                <button
                    onClick={() => navigate("/create")}
                    className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 mt-4 transition duration-150 ease-in-out"
                >
                    Create New Quiz
                </button>
            </div>
        </div>
        </>
    );
};

export default Dashboard;
