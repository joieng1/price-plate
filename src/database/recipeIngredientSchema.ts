import mongoose, { Schema } from "mongoose";

export type IRecipeIngredient = {
    recipeIngredientName: String;
    unitType: String;
    numberUnits: Number;
    costPerUnit: Number;
    cost: Number;
}

const RecipeIngredientSchema = new Schema<IRecipeIngredient>({
    recipeIngredientName: { type: String },
    unitType: { type: String },
    numberUnits: { type: Number },
    costPerUnit: { type: Number },
    cost: { type: Number },
});

const RecipeIngredients = mongoose.models["RecipeIngredients"] || mongoose.model("RecipeIngredients", RecipeIngredientSchema);
export default RecipeIngredients;
