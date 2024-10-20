import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import Navbar from "../../components/Navbar";
import axios from "axios";
import { backendUrl } from "../../config";
import { FaCrown, FaMedal } from "react-icons/fa";

const Leaderboard = () => {
    const { quizId } = useParams();
    const [leaderboard, setLeaderboard] = useState([]);
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");

    useEffect(() => {
        const fetchLeaderboard = async () => {
            try {
                const response = await axios.get(
                    `${backendUrl}/api/play/lb/${quizId}`
                );
                console.log(response.data);
                setLeaderboard(response.data.leaderboard);
                setTitle(response.data.title);
                setDescription(response.data.description);
            } catch (error) {
                console.log(error);
            }
        };
        fetchLeaderboard();
    }, [quizId]);

    const getRankStyle = (rank) => {
        switch (rank) {
            case 1:
                return "bg-yellow-400 text-white font-bold";
            case 2:
                return "bg-gray-300 text-white font-bold";
            case 3:
                return "bg-yellow-600 text-white font-bold";
            default:
                return "bg-blue-100 text-black border-b border-gray-400";
        }
    };

    const getRankIcon = (rank) => {
        switch (rank) {
            case 1:
                return <FaCrown className="text-yellow-500" />;
            case 2:
                return <FaMedal className="text-gray-400" />;
            case 3:
                return <FaMedal className="text-yellow-700" />;
            default:
                return rank;
        }
    };

    return (
        <>
            <Navbar />
            <div className="container mx-auto mt-8 max-w-4xl px-4">
                <div className="text-center mb-8">
                    <h1 className="text-3xl font-bold mb-2">{title}</h1>
                    <p className="text-lg text-gray-700">{description}</p>
                </div>
                <div className="overflow-x-auto">
                    <table className="min-w-full bg-[#cef6fb] shadow-md rounded-lg">
                        <thead>
                            <tr>
                                <th className="py-2 px-4 bg-customBlueLight text-white text-center font-bold w-1/12">Rank</th>
                                <th className="py-2 px-4 bg-customBlue text-white text-center font-bold w-8/12">Username</th>
                                <th className="py-2 px-4 bg-customBlueLight text-white text-center font-bold w-3/12">Score</th>
                            </tr>
                        </thead>
                        <tbody>
                            {leaderboard.map((entry, index) => (
                                <tr key={index} className={`border-b ${index % 2 === 0 ? 'bg-gray-100' : 'bg-white'} ${getRankStyle(index + 1)}`}>
                                    <td className="py-2 px-4 text-center flex justify-center items-center">
                                        {getRankIcon(index + 1)}
                                    </td>
                                    <td className="py-2 px-4 text-center bg-[#00000212]">{entry.username}</td>
                                    <td className="py-2 px-4 text-center">{entry.score}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <div className="text-right text-xs mt-4 text-gray-400">
                    Quiz ID: {quizId}
                </div>
            </div>
        </>
    );
};

export default Leaderboard;