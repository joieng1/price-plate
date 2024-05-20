import mongoose, { Schema } from "mongoose";

export type IIngredient = {
  ingredientName: String;
  brand: String;
  vendor: String;
  unitType: String;
  numberUnits: Number;
  price: Number;
  pricePerUnit: Number;
};

const IngredientSchema = new Schema<IIngredient>({
  ingredientName: { type: String },
  brand: { type: String },
  vendor: { type: String },
  unitType: { type: String },
  numberUnits: { type: Number },
  price: { type: Number },
  pricePerUnit: { type: Number } 
});

const Ingredients = mongoose.models["Ingredients"] || mongoose.model("Ingredients", IngredientSchema);

export default Ingredients;