import mongoose from 'mongoose';
const { Schema } = mongoose;

const userSchema = new Schema({
    name:{
        type:String,
        require:true
    },
    username:{
        type:String,
        require:true,
        unique:true
    },
    email:{
        type:String,
        require:true,
        unique:true
    },
    password:{
        type:String,
        require:true
    },
    role:{
        type:String,
        default:"user"
    },
    date:{
        type:Date,
        default:Date.now
    },

});
const User =mongoose.model('user',userSchema);
User.createIndexes();

export default User;