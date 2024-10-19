import React from "react";
import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import Button from "./containers/Button";
import LogoComponent from "./containers/LogoComponent";
import { NavLinkUnderlined } from "./containers/NavLinkUnderline";
import axios from "axios";

import { IoMdMenu, IoIosArrowUp } from "react-icons/io";

import { UserContext } from "../context/userContext";
import { backendUrl } from "../config";

function Navbar() {
    const [isExpanded, setIsExpanded] = useState(false);
    const { user, setUser, loading, setLoading } = useContext(UserContext);

    const [logged, setLogged] = useState(false);

    const navigate = useNavigate();

    const [avatarUrl, setAvatarUrl] = useState("");



    useEffect(() => {
        if (!user.token && !loading) {
            setLogged(false);
        }
        var name = user.name;

        // generate avatar url using the name with ui-avatars.com
        var url = `https://ui-avatars.com/api/?name=${name}&background=random&rounded=true&size=512&uppercase=true&color=fff`;
        // make url safe
        url = encodeURI(url);
        setAvatarUrl(url);
        if (user.name) {
            setLogged(true);
        }
    }, [user]);

    const toggleNavbar = () => {
        setIsExpanded(!isExpanded);
    };

    return (
        <>
            <nav className="bg-white transition duration-200 ease-in-out">
                <div className="flex justify-between items-center py-4 px-8 m-0 z-1 w-full h-20 bg-white text-black">
                    <LogoComponent click={() => navigate("/")} />

                    <input
                        className="h-10 w-1/2 h-14 hidden md:flex border-gray-300 border-2 bg-gray-100 rounded-[16px] px-4 py-6 text-black font-semibold focus:outline-none hover:border-blue-500 transition duration-500 ease-in-out hover:shadow-md hover:bg-gray-200 md:hidden"
                        placeholder="Learn what you like"
                    />

                    <div className="items-center justify-between gap-auto space-x-5 hidden lg:flex">
                        <NavLinkUnderlined to="/explore" text="Explore">
                            Explore
                        </NavLinkUnderlined>
                        <NavLinkUnderlined to="/create" text="Create">
                            Create
                        </NavLinkUnderlined>
                    </div>

                    <div className="flex flex-row items-center gap-3 ml-5 -mr-5">
                        {logged ? (
                            <div
                                className="flex items-center cursor-pointer"
                                onClick={() => {
                                    navigate("/dashboard");
                                }}
                            >
                                <img
                                    src={avatarUrl}
                                    alt="user image"
                                    className="rounded-full h-10 w-10"
                                />
                            </div>
                        ) : (
                            <Button
                                text="Login"
                                stylevar="font-semibold text-customBlueLight bg-transparent hover:bg-customBlueLight hover:text-white p-2 rounded transition duration-500 ease-in-out border-2 border-customBlueLight py-2 rounded-[16px] hover:shadow-md"
                                onClick={() => {
                                    navigate("/login");
                                }}
                            />
                        )}
                        <div className="lg:hidden">
                            <button
                                className="text-black focus:outline-none text-3xl transition duration-500 ease-in-out"
                                onClick={toggleNavbar}
                            >
                                {isExpanded ? (
                                    <IoIosArrowUp />
                                ) : (
                                    <IoMdMenu />
                                )}
                            </button>
                        </div>
                    </div>
                </div>
                <div
                    className={`lg:hidden ${
                        isExpanded ? "block" : "hidden"
                    } bg-white transition duration-500 ease-in-out`}
                >
                    <div className="flex flex-col mt-4 pb-3">
                        <div className="text-black font-semibold mb-2 text-right space-y-3 pr-5">
                            <div className="inline-flex flex-col">
                                <NavLinkUnderlined to="/explore" text="Explore">
                                    Explore
                                </NavLinkUnderlined>
                                <NavLinkUnderlined to="/create" text="Create">
                                    Create
                                </NavLinkUnderlined>
                            </div>
                        </div>
                        <div className="flex justify-end"></div>
                    </div>
                </div>
            </nav>
        </>
    );
}

export default Navbar;
