import React, { createContext, useState, useEffect } from 'react';
import PropTypes from 'prop-types';

// Create the UserContext
export const UserContext = createContext();

// Create a provider component
export const UserProvider = ({ children }) => {
    const [user, setUser] = useState({
        token: null,
        name: null,
        username: null,
        email: null
    });

    useEffect(() => {
        // Fetch token from localStorage
        const token = localStorage.getItem('token');
        console.log('Token:', token);
    
        if (token) {
            setUser(prevUser => ({
                ...prevUser,
                token,
            }));
        }
    }, []);

    return (
        <UserContext.Provider value={{ user, setUser }}>
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
        throw new Error('useSetUser must be used within a UserProvider');
    }
    return context.setUser;
};