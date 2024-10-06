import React, { useState, useEffect, useContext} from 'react';
import axios from 'axios';
import { UserContext } from '../../context/userContext';
import { backendUrl } from '../../config';

const Dashboard = () => {
    const { user, setUser, loading, setLoading} = useContext(UserContext);
    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState({
        username: user.username,
        email: user.email,
        name: user.name,
    });



    useEffect(() => {
        if (loading) {return;}
        const fetchUser = async () => {
            console.log("token", user.token);
            try {
                const response = await axios.post(`${backendUrl}/api/auth/getuser`, {}, {
                    headers: {
                        "content-type": "application/json",
                        "auth-token": user.token,
                    },
                });
                console.log('User data:', response.data);
                setUser(response.data);
            } catch (error) {
                console.error('Error fetching user data:', error);
            }
        };

        fetchUser();
    }, [loading]);


    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleEdit = () => {
        setIsEditing(true);
    };

    const handleSave = () => {
        setUser(formData);
        setIsEditing(false);
    };

    return (
        <div>
            <h1>Dashboard</h1>
            {isEditing ? (
                <div>
                    <label>
                        Username:
                        <input type="text" name="username" value={formData.username} onChange={handleChange} />
                    </label>
                    <br />
                    <label>
                        Email:
                        <input type="email" name="email" value={formData.email} onChange={handleChange} />
                    </label>
                    <br />
                    <label>
                        Name:
                        <input type="text" name="name" value={formData.name} onChange={handleChange} />
                    </label>
                    <br />
                    <button onClick={handleSave}>Save</button>
                </div>
            ) : (
                <div>
                    <p>Username: {user.username}</p>
                    <p>Email: {user.email}</p>
                    <p>Name: {user.name}</p>
                    <button onClick={handleEdit}>Edit</button>
                </div>
            )}
        </div>
    );
};

export default Dashboard;