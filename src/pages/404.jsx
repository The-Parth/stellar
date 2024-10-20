import React from "react";
import { motion } from "framer-motion";

const NotFoundPage = () => {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
            <motion.div
                className="relative w-32 h-32 mb-8"
                initial={{ y: -300, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 2, ease: "easeOut" }}
                whileHover={{ y: [0, -10, 0], transition: { yoyo: Infinity, duration: 1 } }}
            >
                <div className="absolute inset-0 bg-customBlueDark rounded-full animate-ping"></div>
                <div className="absolute inset-0 bg-customBlueDark rounded-full"></div>
                <div className="absolute inset-0 bg-customBlue rounded-full w-24 h-24 m-auto"></div>
                <div className="absolute inset-0 bg-customBlue rounded-full w-16 h-16 m-auto"></div>
            </motion.div>
            <motion.div
                className="text-center"
                initial={{ y: 300, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 2, ease: "easeOut" }}
                whileHover={{ y: [0, -10, 0], transition: { yoyo: Infinity, duration: 1 } }}
            >
                <h1 className="text-6xl font-bold text-customBlueDark mb-4">404</h1>
                <p className="text-xl text-customBlue">Page Not Found</p>
            </motion.div>
        </div>
    );
};

export default NotFoundPage;
