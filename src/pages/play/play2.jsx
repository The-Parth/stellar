import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

import { backendUrl } from "../../config";

const PlayQuiz = () => {
    const { quizId } = useParams();
    const [quiz, setQuiz] = useState(null);
    const [score, setScore] = useState(0);

    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);

    const token = localStorage.getItem("token");

    // fetch quiz data by quizId from backendUrl/api/play/:quizId
    useEffect(() => {
        if (!quizId) {
            return;
        }
        if (!token) {
            navigate("/login");
        }
        const fetchQuiz = () => {
            axios
                .get(`${backendUrl}/api/play/${quizId}`,
                {
                    headers: {
                        "Content-Type": "application/json",
                        "auth-token": token,
                    },
                })
                .then((response) => {
                    setQuiz(response.data);
                    setLoading(false);
                    console.log(response.data);
                })
                .catch((error) => {
                    console.log(error);
                });
        };
        fetchQuiz();
    }, [quizId]);

    return (
        <>
        {quizId}
        </>
    );
};

export default PlayQuiz;