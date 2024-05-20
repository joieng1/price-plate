import mongoose, { Schema } from "mongoose";
import RecipeIngredients, {IRecipeIngredient} from "./recipeIngredientSchema";

export type IRecipe = {
  recipeName: String;
  recipeIngredients: IRecipeIngredient[]
  totalCost: Number
};

const RecipeSchema = new Schema<IRecipe>({
  recipeName: { type: String },
  recipeIngredients: [RecipeIngredients],
  totalCost: { type: Number },
});

const Recipes = mongoose.models["Recipes"] || mongoose.model("Recipes", RecipeSchema);

export default Recipes;