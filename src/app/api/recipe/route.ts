import { NextRequest, NextResponse} from "next/server"
import connectDB from "@/database/db"
import Recipes from "@/database/recipeSchema";

export async function POST(req: NextRequest) {
  await connectDB();
  try {
    const {userID, recipeName, recipeIngredients, totalCost} = await req.json();
    const newRecipe = await new Recipes({
      userID,
      recipeName,
      recipeIngredients,
      totalCost
    })
    await newRecipe.save();
    return NextResponse.json(newRecipe)
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