import mongoose, { ObjectId, Schema } from "mongoose";
import { UnitTypeEnum } from "@/types/unitTypes";

export type IIngredient = {
  userID: ObjectId;
  ingredientName: String;
  brand: String;
  vendor: String;
  unitType: UnitTypeEnum;
  numberUnits: Number;
  price: Number;
  pricePerUnit: Number;
};

const IngredientSchema = new Schema<IIngredient>({
  userID: { type: mongoose.Schema.Types.ObjectId },
  ingredientName: { type: String },
  brand: { type: String },
  vendor: { type: String },
  unitType: { type: String, enum: Object.values(UnitTypeEnum)},
  numberUnits: { type: Number },
  price: { type: Number },
  pricePerUnit: { type: Number } 
});

const Ingredients = mongoose.models["Ingredients"] || mongoose.model("Ingredients", IngredientSchema);

export default Ingredients;