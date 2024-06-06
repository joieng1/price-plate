import mongoose, { ObjectId, Schema } from "mongoose";
import { UnitTypeEnum } from "@/types/unitTypes";

export type IRecipeIngredient = {
  ingredientID: String,
  ingredientName: String;
  unitType: UnitTypeEnum;
  numberUnits: Number;
  price: Number;
}

const RecipeIngredientSchema = new Schema<IRecipeIngredient>({
  ingredientID: {type: String},
  ingredientName: { type: String },
  unitType: { type: String },
  numberUnits: { type: Number },
  price: { type: Number },
});

export type IRecipe = {
  userID: ObjectId;
  recipeName: String;
  recipeIngredients: IRecipeIngredient[]
  totalCost: Number
};

const RecipeSchema = new Schema<IRecipe>({
  userID: { type: mongoose.Schema.Types.ObjectId },
  recipeName: { type: String },
  recipeIngredients: { type: [RecipeIngredientSchema] },
  totalCost: { type: Number },
});

const Recipes = mongoose.models["Recipes"] || mongoose.model("Recipes", RecipeSchema);

export default Recipes;