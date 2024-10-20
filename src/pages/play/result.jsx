import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const ResultPage = () => {
    const { attemptId } = useParams();
    const [score, setScore] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchScore = async () => {
            try {
                // Replace with your actual API endpoint
                const response = await axios.get(`/api/play/attempt/${attemptId}`);
                setScore(response.data.score);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchScore();
    }, [attemptId]);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div>
            <h1>Result for Attempt ID: {attemptId}</h1>
            <p>Your Score: {score}</p>
        </div>
    );
};

export default ResultPage;
