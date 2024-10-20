import mongoose from "mongoose";

const Schema = mongoose.Schema;

const AttemptSchema = new Schema({
    quizId: {
        type: String,
        required: true,
    },

    isFirstAttempt: {
        type: Boolean,
        required: true,
        default: true,
    },

    userId: {
        type: String,
        required: true,
    },
    answers: {
        type: Array,
        required: true,
    },
    finalScore: {
        type: Number,
        required: true,
    },
    attemptedAt: {
        type: Date,
        default: Date.now,
    },
});

const Attempt = mongoose.model("attempt", AttemptSchema);

export default Attempt;
