import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/database/db";
import Recipes from "@/database/recipeSchema";
import Users from "@/database/userSchema";

export async function POST(req: NextRequest) {
  await connectDB();
  try {
    const { userID, recipeName, recipeIngredients, totalCost } =
      await req.json();
    const newRecipe = await new Recipes({
      userID,
      recipeName,
      recipeIngredients,
      totalCost,
    }).save();

    // add the recipe's ID to the recipes array of the user object
    const updatedUser = await Users.findByIdAndUpdate(
      userID,
      { $push: { recipes: newRecipe._id } },
      { new: true }
    );

    if (!updatedUser) {
      return NextResponse.json({ message: "Failed to add" });
    }
    return NextResponse.json(newRecipe);
  } catch (error) {
    console.log(error);
    return NextResponse.json(error, { status: 400 });
  }
}

// returns all recipes
export async function GET(req: NextRequest, res: NextResponse) {
  await connectDB();
  try {
    const recipes = await Recipes.find().exec();
    return NextResponse.json(recipes);
  } catch (error) {
    console.log(error);
    return NextResponse.json(error);
  }
}
