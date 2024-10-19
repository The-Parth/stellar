import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const PlayQuiz = () => {
    const { quizId } = useParams();
    const [quiz, setQuiz] = useState(null);
    const [score, setScore] = useState(0);

    return (
        <>
        {quizId}
        </>
    );
};

export default PlayQuiz;