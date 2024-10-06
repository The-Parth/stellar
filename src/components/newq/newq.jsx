import React, { useState } from 'react';
import axios from 'axios';

import { backendUrl } from '../../config';

const NewQuiz = ({ quizId }) => {
    const [question, setQuestion] = useState('');
    const [type, setType] = useState('');
    const [options, setOptions] = useState([]);
    const [answer, setAnswer] = useState('');

    const handleAddQuestion = async () => {
        try {
            const response = await axios.post(`${backendUrl}/api/quiz/question/create`, {
                question,
                type,
                options,
                answer,
            });
            const newQuestion = response.data;

            await axios.post(`${backendUrl}/api/quiz/${quizId}/add`, {
                questionId: newQuestion.id,
            });

            alert('Question added to quiz successfully!');
        } catch (error) {
            console.error('Error adding question to quiz:', error);
            alert('Failed to add question to quiz.');
        }
    };

    return (
        <div>
            <h2>Add New Question</h2>
            <div>
                <label>Question:</label>
                <input
                    type="text"
                    value={question}
                    onChange={(e) => setQuestion(e.target.value)}
                />
            </div>
            <div>
                <label>Type:</label>
                <input
                    type="text"
                    value={type}
                    onChange={(e) => setType(e.target.value)}
                />
            </div>
            <div>
                <label>Options:</label>
                <input
                    type="text"
                    value={options}
                    onChange={(e) => setOptions(e.target.value.split(','))}
                />
            </div>
            <div>
                <label>Answer:</label>
                <input
                    type="text"
                    value={answer}
                    onChange={(e) => setAnswer(e.target.value)}
                />
            </div>
            <button onClick={handleAddQuestion}>Add Question to Quiz</button>
        </div>
    );
};

export default NewQuiz;
