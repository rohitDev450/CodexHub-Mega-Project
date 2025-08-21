import mongoose from "mongoose";

const UserSchema = mongoose.Schema({
    fullname: {
        type: String, // 'String' should start with an uppercase "S"
        required: true // Correct spelling of 'required'
    },
    email: {
        type: String,
        required: true, // Correct spelling of 'required'
        unique: true
    },
    password: {
        type: String, // 'String' should start with an uppercase "S"
        required: true // Correct spelling of 'required'
    }
});

const User = mongoose.model("User", UserSchema);
export default User;
