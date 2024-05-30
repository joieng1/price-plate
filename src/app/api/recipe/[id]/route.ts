import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/database/db";
import Recipes from "@/database/recipeSchema";

// returns specific recipe
export async function GET(req: NextRequest, { params }: any) {
  const { id } = params; // Extract the id from params
  try {
    const recipe = await Recipes.findById(id).orFail();
    return NextResponse.json(recipe);
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: "Recipe not found" }, { status: 404 });
  }
}

//updates recipe
export async function PUT(req: NextRequest, { params }: any) {
  await connectDB();
  const { id } = params;
  try {
    const body = await req.json();
    const currentRecipe = await Recipes.findById(id);
    const updatedFields = {
      recipeName: body.recipeName || currentRecipe.recipeName,
      recipeIngredients:
        body.recipeIngredients || currentRecipe.recipeIngredients,
      totalCost:
        body.totalCost !== undefined ? body.totalCost : currentRecipe.totalCost,
    };
    const recipe = await Recipes.findByIdAndUpdate(id, { $set: updatedFields });
    return NextResponse.json(recipe);
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: "Failed to update" }, { status: 400 });
  }
}

//delete recipe
export async function DELETE(req: NextRequest, { params }: any) {
  await connectDB();
  const { id } = params;
  try {
    await Recipes.findByIdAndDelete(id);
    return NextResponse.json({ message: "Deleted" });
  } catch (error) {
    return NextResponse.json({ message: "Failed to delete" }, { status: 500 });
  }
}