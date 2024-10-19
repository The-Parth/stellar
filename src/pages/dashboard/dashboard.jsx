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

    const handleCancel = () => {
        // reset form data
        setFormData({
            username: user.username,
            email: user.email,
            name: user.name,
            oldPassword: "",
            newPassword: "",
            confirmPassword: "",
        });
        setIsEditing(false);
    };

    const handleDelete = (quiz_id) => {
        const deleteQuiz = async () => {
            try {
                const response = await axios.delete(
                    `${backendUrl}/api/quiz/${quiz_id}`,
                    {
                        headers: {
                            "content-type": "application/json",
                            "auth-token": user.token,
                        },
                    }
                );
                console.log("Quiz deleted:", response.data);
                setQuiz(quiz.filter((q) => q.quiz_id !== quiz_id));
            } catch (error) {
                console.error("Error deleting quiz:", error);
            }
        };

        deleteQuiz();
    };

    return (
        <>
            {" "}
            <Navbar />
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
                                {formData.newPassword !==
                                formData.confirmPassword
                                    ? "Passwords do not match"
                                    : "Passwords match"}
                            </span>
                            <div className="flex space-x-4">
                                <button
                                    onClick={handleSave}
                                    className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition duration-150 ease-in-out"
                                >
                                    Save
                                </button>
                                <button
                                    onClick={handleCancel}
                                    className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-gray-600 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 transition duration-150 ease-in-out"
                                >
                                    Cancel
                                </button>
                            </div>
                        </div>
                    ) : (
                        <div className="flex flex-col-reverse md:flex-row items-center md:items-start space-y-4 md:space-y-0 md:space-x-4">
                            <div className="flex-1 space-y-2">
                                <p className="text-lg">
                                    Username: {user.username}
                                </p>
                                <p className="text-lg">Email: {user.email}</p>
                                <p className="text-lg">Name: {user.name}</p>
                                <button
                                    onClick={handleEdit}
                                    className="w-full md:w-auto flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition duration-150 ease-in-out"
                                >
                                    Edit
                                </button>
                            </div>
                            <div className="flex-shrink-0 pb-10 md:mb-0">
                                <img
                                    src={
                                        user.profilePicture ||
                                        "https://via.placeholder.com/150"
                                    }
                                    alt="Profile"
                                    className="w-24 h-24 rounded-full"
                                />
                            </div>
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
                                    className="relative border p-4 rounded-md shadow-sm bg-white hover:shadow-lg transition duration-150 ease-in-out"
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

                                        <div className="flex flex-col px-3 md:flex-row md:items-center md:space-x-4 mt-5 md:mt-0">
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
                                                        : q.difficulty ===
                                                          "medium"
                                                        ? "Medium"
                                                        : "Easy"}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                    <span
                                        className={`absolute top-4 right-4 text-xs font-semibold px-2 py-1 -translate-y-1 rounded-md ${
                                            q.isPublished
                                                ? "bg-green-100 text-green-800"
                                                : "bg-red-100 text-red-800"
                                        }`}
                                    >
                                        {q.isPublished
                                            ? "Published"
                                            : "Unpublished"}
                                    </span>
                                    <button
                                        onClick={(e) => {
                                            e.stopPropagation(); // Prevent the click from triggering the navigate
                                            handleDelete(q.quiz_id);
                                        }}
                                        className="absolute bottom-4 right-4 bg-red-600 text-white text-xs px-2 py-1 rounded-md hover:bg-red-700 transition duration-150 ease-in-out translate-y-1"
                                    >
                                        Delete
                                    </button>
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
                        className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-customBlue hover:bg-customBlueDark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 mt-4 transition duration-150 ease-in-out"
                    >
                        Create New Quiz
                    </button>
                </div>
            </div>
        </>
    );
};

export default Dashboard;
