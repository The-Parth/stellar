import { React, useState, useEffect, useContext } from 'react';
import axios from 'axios';
import NewQuestion from '../../components/newq/newq'; // Correct import
import { UserContext } from '../../context/userContext';
import { backendUrl } from '../../config';
import { useParams } from 'react-router-dom'; // Import useParams

const EditQuiz = () => {
    const { quizId } = useParams(); // Destructure quizId from useParams
    const { user, loading, setLoading } = useContext(UserContext);

    const [quizName, setQuizName] = useState('');
    const [description, setDescription] = useState(''); 
    const [tags, setTags] = useState('');
    const [category, setCategory] = useState('');
    const [difficulty, setDifficulty] = useState('');
    const [questions, setQuestions] = useState([]);
    const [newQuestion, setNewQuestion] = useState(false);

    useEffect(() => {
        const fetchQuiz = async () => {
            try {
                const response = await axios.get(`${backendUrl}/api/quiz/${quizId}`, {
                    headers: {
                        'content-type': 'application/json',
                        'auth-token': user.token,
                    },
                });
                const quiz = response.data;
                setQuizName(quiz.title);
                setDescription(quiz.description);
                setTags(quiz.tags);
                setCategory(quiz.category);
                setDifficulty(quiz.difficulty);
                setQuestions(quiz.questions);

                console.log(quiz);
            } catch (error) {
                console.error('Error fetching quiz:', error);
            }
        };

        fetchQuiz();
    }, [quizId, user.token]);

    return (
        <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-md">
                <h1 className="text-center text-3xl font-bold leading-9 tracking-tight text-gray-900">
                    Edit Quiz
                </h1>
            </div>
            <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
                <button
                    className="mt-4 w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
                    onClick={() => setNewQuestion(true)}
                >
                    Add Question
                </button>
                {newQuestion && <NewQuestion quizId={quizId} user={user} />}
            </div>
        </div>
    );
};

export default EditQuiz;