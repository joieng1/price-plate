import mongoose, { Decimal128, Schema } from "mongoose";

export type IIngredient = {
  ingredientName: String;
  brand: String;
  vendor: String;
  unitType: String;
  numberUnits: Decimal128;
  price: Decimal128;
};

const IngredientSchema = new Schema<IIngredient>({
  ingredientName: { type: String, required: true },
  brand: { type: String, required: false },
  vendor: { type: String, required: false },
  unitType: { type: String, required: true },
  numberUnits: { type: String, required: true },
  price: { type: String, required: true },
});

const Ingredients = mongoose.models["Ingredients"] || mongoose.model("Ingredients", IngredientSchema);

export default Ingredients;