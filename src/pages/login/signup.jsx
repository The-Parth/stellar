import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Link } from "react-router-dom";
import { IoEye, IoEyeOff } from "react-icons/io5";
import { backendUrl } from "../../config";


function Signup() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            alert("Passwords do not match");
            return;
        }
        try {
            // Replace with your signup API endpoint
            const response = await axios.post(`${backendUrl}/api/auth/register`, {
                name,
                email,
                username,
                password,
            });
            if (response.data.success) {
                navigate("/dashboard");
            } else {
                alert("Signup failed");
            }
        } catch (error) {
            console.error("There was an error signing up!", error);
        }
    };

    const [passwordVisible, setPasswordVisible] = useState(false);
    const [passwordVisible2, setPasswordVisible2] = useState(false);

    return (
        <>
            <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8 logreg-page">
                <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                    <h1
                        className="text-center text-2xl font-bold leading-9 tracking-tight text-blue-500"
                        style={{ fontSize: "2rem" }}
                    >
                        Stellar
                    </h1>
                    <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900 ">
                        Create a new account
                    </h2>
                </div>

                <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                    <form className="space-y-6" onSubmit={handleSubmit}>
                        <div>
                            <label
                                htmlFor="name"
                                className="block text-sm font-medium text-gray-700"
                            >
                                Name
                            </label>
                            <div className="mt-1">
                                <input
                                    id="name"
                                    name="name"
                                    type="text"
                                    autoComplete="name"
                                    required
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                />
                            </div>
                        </div>

                        <div>
                            <label
                                htmlFor="email"
                                className="block text-sm font-medium text-gray-700"
                            >
                                Email address
                            </label>
                            <div className="mt-1">
                                <input
                                    id="email"
                                    name="email"
                                    type="email"
                                    autoComplete="email"
                                    required
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                />
                            </div>
                        </div>

                        <div>
                            <label
                                htmlFor="username"
                                className="block text-sm font-medium text-gray-700"
                            >
                                Username
                            </label>
                            <div className="mt-1">
                                <input
                                    id="username"
                                    name="username"
                                    type="text"
                                    autoComplete="username"
                                    required
                                    value={username}
                                    onChange={(e) =>
                                        setUsername(e.target.value)
                                    }
                                    className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                />
                            </div>
                        </div>

                        <div>
                            <label
                                htmlFor="password"
                                className="block text-sm font-medium text-gray-700"
                            >
                                Password
                            </label>
                            <div className="mt-1 relative">
                                <input
                                    id="password"
                                    name="password"
                                    type={passwordVisible ? "text" : "password"}
                                    autoComplete="new-password"
                                    required
                                    value={password}
                                    onChange={(e) =>
                                        setPassword(e.target.value)
                                    }
                                    className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                />
                                <button
                                    type="button"
                                    onClick={() =>
                                        setPasswordVisible(!passwordVisible)
                                    }
                                    className="absolute flex md:hidden inset-y-0 right-0 pr-3 items-center text-2xl text-blue-600 hover:text-blue-500"
                                >
                                    {passwordVisible ? <IoEye /> : <IoEyeOff />}
                                </button>
                                <button
                                    type="button"
                                    onMouseDown={() => setPasswordVisible(true)}
                                    onMouseUp={() => setPasswordVisible(false)}
                                    onMouseLeave={() =>
                                        setPasswordVisible(false)
                                    }
                                    className="absolute hidden md:flex inset-y-0 right-0 pr-3 items-center text-2xl text-blue-600 hover:text-blue-500"
                                >
                                    {passwordVisible ? <IoEye /> : <IoEyeOff />}
                                </button>
                            </div>
                        </div>

                        <div>
                            <label
                                htmlFor="confirm-password"
                                className="block text-sm font-medium text-gray-700"
                            >
                                Confirm Password
                            </label>
                            <div className="mt-1 relative">
                                <input
                                    id="confirm-password"
                                    name="confirm-password"
                                    type={
                                        passwordVisible2 ? "text" : "password"
                                    }
                                    autoComplete="new-password"
                                    required
                                    value={confirmPassword}
                                    onChange={(e) =>
                                        setConfirmPassword(e.target.value)
                                    }
                                    className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                />
                                <button
                                    type="button"
                                    onClick={() =>
                                        setPasswordVisible2(!passwordVisible2)
                                    }
                                    className="absolute flex md:hidden inset-y-0 right-0 pr-3 items-center text-2xl text-blue-600 hover:text-blue-500"
                                >
                                    {passwordVisible2 ? <IoEye /> : <IoEyeOff />}
                                </button>
                                <button
                                    type="button"
                                    onMouseDown={() =>
                                        setPasswordVisible2(true)
                                    }
                                    onMouseUp={() => setPasswordVisible2(false)}
                                    onMouseLeave={() =>
                                        setPasswordVisible2(false)
                                    }
                                    className="absolute hidden md:flex inset-y-0 right-0 pr-3 items-center text-2xl text-blue-600 hover:text-blue-500"
                                >
                                    {passwordVisible2 ? (
                                        <IoEye />
                                    ) : (
                                        <IoEyeOff />
                                    )}
                                </button>
                            </div>
                        </div>

                        <div>
                            <button
                                type="submit"
                                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                            >
                                Sign up
                            </button>
                        </div>
                    </form>
                    <p className="mt-2 text-center text-sm text-gray-600">
                        Or{" "}
                        <Link
                            to="/login"
                            className="font-medium text-blue-600 hover:text-blue-500"
                        >
                            sign in to your account
                        </Link>
                    </p>
                </div>
            </div>
        </>
    );
}

export default Signup;
