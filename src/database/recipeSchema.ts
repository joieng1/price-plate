import mongoose, { Decimal128, Schema } from "mongoose";

export type IRecipe = {
  recipeName: string;
  totalCost: Decimal128;
};

const RecipeSchema = new Schema<IRecipe>({
  recipeName: { type: String, required: true },
  totalCost: { type: String, required: false}
});

const Recipes = mongoose.models["Recipes"] || mongoose.model("Recipes", RecipeSchema);

export default Recipes;