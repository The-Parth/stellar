import React, { useState } from 'react';

const PlayQuiz = () => {
    const [score, setScore] = useState(0);
    const [showScore, setShowScore] = useState(false);
    const [selectedAnswers, setSelectedAnswers] = useState({});

    const questions = [
        {
            questionText: 'What is the capital of France?',
            answerOptions: [
                { answerText: 'New York', isCorrect: false },
                { answerText: 'London', isCorrect: false },
                { answerText: 'Paris', isCorrect: true },
                { answerText: 'Dublin', isCorrect: false },
            ],
        },
        {
            questionText: 'Who is CEO of Tesla?',
            answerOptions: [
                { answerText: 'Jeff Bezos', isCorrect: false },
                { answerText: 'Elon Musk', isCorrect: true },
                { answerText: 'Bill Gates', isCorrect: false },
                { answerText: 'Tony Stark', isCorrect: false },
            ],
        },
        // Add more questions as needed
    ];

    const handleAnswerOptionClick = (questionIndex, answerIndex) => {
        setSelectedAnswers({
            ...selectedAnswers,
            [questionIndex]: answerIndex,
        });
    };

    const handleSubmit = () => {
        let newScore = 0;
        questions.forEach((question, questionIndex) => {
            if (question.answerOptions[selectedAnswers[questionIndex]]?.isCorrect) {
                newScore += 1;
            }
        });
        setScore(newScore);
        setShowScore(true);
    };

    return (
        <div className='min-h-screen flex items-center justify-center bg-gray-100'>
            <div className='bg-white p-8 rounded-lg shadow-lg w-full max-w-2xl'>
                {showScore ? (
                    <div className='text-center'>
                        <div className='text-2xl font-bold mb-4'>You scored {score} out of {questions.length}</div>
                        <button
                            className='mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700'
                            onClick={() => setShowScore(false)}
                        >
                            Try Again
                        </button>
                    </div>
                ) : (
                    <>
                        {questions.map((question, questionIndex) => (
                            <div key={questionIndex} className='mb-6'>
                                <div className='text-lg font-semibold mb-2'>
                                    <span>Question {questionIndex + 1}</span>/{questions.length}
                                </div>
                                <div className='text-xl mb-4'>{question.questionText}</div>
                                <div className='grid grid-cols-2 gap-4'>
                                    {question.answerOptions.map((answerOption, answerIndex) => (
                                        <button
                                            key={answerIndex}
                                            className={`px-4 py-2 border rounded ${selectedAnswers[questionIndex] === answerIndex ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
                                            onClick={() => handleAnswerOptionClick(questionIndex, answerIndex)}
                                        >
                                            {answerOption.answerText}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        ))}
                        <button
                            className='mt-4 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-700'
                            onClick={handleSubmit}
                        >
                            Submit
                        </button>
                    </>
                )}
            </div>
        </div>
    );
};

export default PlayQuiz;