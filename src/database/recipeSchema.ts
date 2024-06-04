import mongoose, { ObjectId, Schema } from "mongoose";

export type IRecipeIngredient = {
  recipeIngredientName: string;
  unitType: string;
  numberUnits: number;
  costPerUnit: number;
  cost: number;
}

const RecipeIngredientSchema = new Schema<IRecipeIngredient>({
  recipeIngredientName: { type: String },
  unitType: { type: String },
  numberUnits: { type: Number },
  costPerUnit: { type: Number },
  cost: { type: Number },
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