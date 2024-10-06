import mongoose from "mongoose";
const { Schema } = mongoose;

const quizSchema = new Schema({
    quiz_id: {
        type: String,
        required: true,
    },
    author: {
        type: String,
        required: true,
    },
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: false,
    },
    category: {
        type: String,
        required: false,
    },
    tags: {
        type: [String],
        required: false,
    },
    questions: {
        type: Array,
        required: true,
    },
    date: {
        type: Date,
        default: Date.now,
    },
    duration: {
        type: Number,
        required: false,
    },
    difficulty: {
        type: String,
        required: false,
        enum: ["easy", "medium", "hard"],
    },
    privacy: {
        type: String,
        required: true,
        default: "public",
    },
    isPublished: {
        type: Boolean,
        required: true,
        default: false,
    },
    users: {
        type: Array,
        required: false,
    },
});

const Quiz = mongoose.model("quiz", quizSchema);

export default Quiz;
