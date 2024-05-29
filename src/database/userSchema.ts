import mongoose, { Schema, ObjectId } from "mongoose";

export type IUser = {
  firstName: String;
  lastName: String;
  email: String;
  username: String;
  password: String;
  recipes: ObjectId[];
  ingredients: ObjectId[];
};

const UserSchema = new Schema<IUser>({
  firstName: { type: String },
  lastName: { type: String },
  email: { type: String, required: true},
  username: { type: String, required: true, unique: true},
  password: { type: String, required: true},
  recipes: [{ type: mongoose.Schema.Types.ObjectId }],
  ingredients: [{ type: mongoose.Schema.Types.ObjectId }],
});

const Users = mongoose.models["Users"] || mongoose.model("Users", UserSchema);

export default Users;
