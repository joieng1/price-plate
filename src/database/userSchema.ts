import mongoose, { Schema, ObjectId } from "mongoose";
import Recipes, { IRecipe } from "./recipeSchema";
import Ingredients, { IIngredient } from "./ingredientSchema";

export type IUser = {
  firstName: String;
  lastName: String;
  email: String;
  username: String;
  password: String;
  recipes: IRecipe[];
  ingredients: IIngredient[];
};

const UserSchema = new Schema<IUser>({
  firstName: { type: String },
  lastName: { type: String },
  email: { type: String, required: true},
  username: { type: String, required: true, unique: true},
  password: { type: String, required: true},
  recipes: [Recipes],
  ingredients: [Ingredients]
});

const Users = mongoose.models["Users"] || mongoose.model("Users", UserSchema);

export default Users;
