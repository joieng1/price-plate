import mongoose, { ObjectId, Schema } from "mongoose";

export type IIngredient = {
  userID: ObjectId;
  ingredientName: String;
  brand: String;
  vendor: String;
  unitType: String;
  numberUnits: Number;
  price: Number;
  pricePerUnit: Number;
};

const IngredientSchema = new Schema<IIngredient>({
  userID: { type: mongoose.Schema.Types.ObjectId },
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