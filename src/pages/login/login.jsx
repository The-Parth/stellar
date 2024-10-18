import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Link } from "react-router-dom";
import { backendUrl } from "../../config";

function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [invalidPass, setInvalidPass] = useState("hidden");
    const navigate = useNavigate();

    // check if user is already logged in, redirect to dashboard
    if (localStorage.getItem("token")) {
        navigate("/dashboard");
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // Replace with your login API endpoint
            console.log("Logging in...");
            console.log("Email: ", email);
            console.log("Password", password);
            const response = await axios.post(`${backendUrl}/api/auth/login`, { email, password });
            if (response.data.success) {
                // store token in local
                localStorage.setItem("token", response.data.token);
                navigate("/dashboard");
                window.location.reload();
            } else {
                console.error("There was an error logging in!", response.data);
            }
        } catch (error) {
            if (error.response.status == 400) {
                console.error("Invalid email or password!");
                setInvalidPass("block");

            } else
                console.error("There was an error logging in!", error);
        }
    };

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
                        Sign in to your account
                    </h2>
                </div>

                <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                    <form className="space-y-6" onSubmit={handleSubmit}>
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
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
                            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                                Password
                            </label>
                            <div className="mt-1">
                                <input
                                    id="password"
                                    name="password"
                                    type="password"
                                    autoComplete="current-password"
                                    required
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                />
                            </div>
                        </div>
                        <div className={`flex items-center justify-between ${invalidPass}`}>
                            <p className="text-red-500">Invalid email or password</p>
                        </div>
                        <div>
                            <button
                                type="submit"
                                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                            >
                                Sign in
                            </button>
                        </div>
                    </form>
                    <p className="mt-2 text-center text-sm text-gray-600">
                        Or{" "}
                        <Link to="/register" className="font-medium text-blue-600 hover:text-blue-500">
                            create a new account
                        </Link>
                    </p>
                </div>
            </div>
        </>
    );
}

export default Login;
