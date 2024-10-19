import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const AttemptSchema = new Schema({
    quizId: {
        type : String,
        required : true
    },

    userId: {
        type: String,
        required: true
    },
    answers: [{
        questionId: {
            type: String,
            required: true
        },
        selectedOption: {
            type: Array,
            required: true
        },
        isCorrect: {
            type: Boolean,
            required: true
        },
        score: {
            type: Number,
            required: true
        }
    }],
    finalScore: {
        type: Number,
        required: true
    },
    attemptedAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Attempt', AttemptSchema);