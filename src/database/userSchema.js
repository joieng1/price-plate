import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
    {
        firstName: {
            type: String,
            required: true,
            trim: true,
        },
        lastName: {
            type: String,
            required: true,
            trim: true,
        },
        email: {
            type: String,
            required: true,
            trim: true,
        },
        username: {
            type: String,
            required: true
        },
        password: {
            type: String,
            required: true
        },
    }
)

const User = mongoose.model("Users", UserSchema);
export default User;