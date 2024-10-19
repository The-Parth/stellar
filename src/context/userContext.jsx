import React, { createContext, useState, useEffect } from "react";
import axios from "axios";
import PropTypes from "prop-types";

import { backendUrl } from "../config";

// Create the UserContext
export const UserContext = createContext();

// Create a provider component
export const UserProvider = ({ children }) => {
    const [loading, setLoading] = useState(true);
    const [user, setUser] = useState({
        token: null,
        name: null,
        username: null,
        email: null,
    });

    useEffect(() => {
        // Fetch token from localStorage
        const token = localStorage.getItem("token");
        console.log("Token:", token);

        if (token) {
            setUser((prevUser) => ({
                ...prevUser,
                token,
            }));

            // Fetch user data
            const fetchUser = async () => {
                try {
                    await axios
                        .post(
                            `${backendUrl}/api/auth/getuser`,
                            {},
                            {
                                headers: {
                                    "content-type": "application/json",
                                    "auth-token": token,
                                },
                            }
                        )
                        .then((response) => {
                            setUser({
                                name: response.data.name,
                                username: response.data.username,
                                email: response.data.email,
                                token: token,
                            });
                        });
                } catch (error) {
                    console.error("Error fetching user data:", error);
                }
            };
            fetchUser().then(() => {
                console.log("User fetched");
                setLoading(false);
            });
        }
    }, []);

    return (
        <UserContext.Provider value={{ user, setUser, loading, setLoading }}>
            {children}
        </UserContext.Provider>
    );
};

UserProvider.propTypes = {
    children: PropTypes.node.isRequired,
};

// Export the setUser function
export const useSetUser = () => {
    const context = React.useContext(UserContext);
    if (context === undefined) {
        throw new Error("useSetUser must be used within a UserProvider");
    }
    return context.setUser;
};
