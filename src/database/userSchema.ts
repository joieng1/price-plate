import mongoose, { Schema } from "mongoose";

export type IUser = {
  firstName: string;
  lastName: string;
  email: string;
  username: string;
  password: string;
};

const UserSchema = new Schema<IUser>({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  username: { type: String, required: false },
  password: { type: String, required: true },
});

const Users = mongoose.models["Users"] || mongoose.model("Users", UserSchema);

export default Users;
