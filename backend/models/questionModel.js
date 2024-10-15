import mongoose from "mongoose";
const { Schema } = mongoose;

const questionSchema = new Schema({
    question: {
        type: String,
        required: true
    },
    type : {
        type: String,
        required: true,
        default: "single"
    },
    options : {
        type: Array,
        required: true
    },
    answer : {
        type: Array,
        required: true
    },
    id : {
        type: String,
        required: true
    },
});

const Question = mongoose.model('question', questionSchema);

export default Question;