import { useEffect } from 'react';

const Logout = () => {
    useEffect(() => {
        localStorage.removeItem("user");
        localStorage.removeItem("token");
        window.location.href = "/login";
    }, []);

    return null;
};

export default Logout;