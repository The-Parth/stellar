import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../../components/Navbar';

const Explore = () => {
    return (
        <div>
            <Navbar />
            <div className="p-8">
                <h1 className="text-4xl font-bold mb-4">Explore Page</h1>
                <p className="text-lg">Welcome to the explore page. Here you can find various resources and information.</p>
            </div>
        </div>
    );
};

export default Explore;