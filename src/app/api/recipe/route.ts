import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/database/db";
import Recipes from "@/database/recipeSchema";
import Users from "@/database/userSchema";
import { authenticateUser } from "@/middleware/auth";

export async function POST(req: NextRequest) {
  await connectDB();
  try {
    const { userID, recipeName, recipeIngredients, totalCost } =
      await req.json();

    //authorization check
    if (!process.env.JWT_SECRET) {
      return NextResponse.json(
        { message: "An error occurred. Please try again later." },
        { status: 400 }
      );
    }
    const verifytoken = await authenticateUser(req);
    const jsonData = await verifytoken.json();
    if (jsonData.message != "Authorized") {
      return NextResponse.json(
        { message: "Failed: Unauthorized" },
        { status: 401 }
      );
    }

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
    //authorization check
    if (!process.env.JWT_SECRET) {
      return NextResponse.json(
        { message: "An error occurred. Please try again later." },
        { status: 400 }
      );
    }
    const verifytoken = await authenticateUser(req);
    const jsonData = await verifytoken.json();
    if (jsonData.message != "Authorized") {
      return NextResponse.json(
        { message: "Failed: Unauthorized" },
        { status: 401 }
      );
    }

    const recipes = await Recipes.find().exec();
    return NextResponse.json(recipes);
  } catch (error) {
    console.log(error);
    return NextResponse.json(error);
  }
}
