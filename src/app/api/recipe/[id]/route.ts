import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/database/db";
import Recipes from "@/database/recipeSchema";
import Users from "@/database/userSchema";
import { authenticateUser } from "@/middleware/auth";

// returns specific recipe
export async function GET(req: NextRequest, { params }: any) {
  const { id } = params; // Extract the id from params
  try {
    if (!process.env.JWT_SECRET) {
      return NextResponse.json({ message: "An error occurred. Please try again later." }, { status: 400 });
    }
    const verifytoken = await authenticateUser(req);
    const jsonData = await verifytoken.json();
    console.log("Json data: ",jsonData)
    if (jsonData.message != 'Authorized') {
      return NextResponse.json(
        { message: "Failed: Unauthorized" },
        { status: 401 }
      );
    }
    
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
    
    if (!process.env.JWT_SECRET) {
      return NextResponse.json({ message: "An error occurred. Please try again later." }, { status: 400 });
    }
    const verifytoken = await authenticateUser(req);
    const jsonData = await verifytoken.json();
    console.log("Json data: ",jsonData)
    if (jsonData.message != 'Authorized') {
      return NextResponse.json(
        { message: "Failed: Unauthorized" },
        { status: 401 }
      );
    }

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
    if (!process.env.JWT_SECRET) {
      return NextResponse.json({ message: "An error occurred. Please try again later." }, { status: 400 });
    }
    const verifytoken = await authenticateUser(req);
    const jsonData = await verifytoken.json();
    console.log("Json data: ",jsonData)
    if (jsonData.message != 'Authorized') {
      return NextResponse.json(
        { message: "Failed: Unauthorized" },
        { status: 401 }
      );
    }
    const recipe = await Recipes.findById(id);

    if (!recipe) {
      return NextResponse.json(
        { message: "Recipe not found" },
        { status: 404 }
      );
    }

    await Recipes.findByIdAndDelete(id);
    await Users.findByIdAndUpdate(recipe.userId, { $pull: { recipes: id } });
    return NextResponse.json({ message: "Deleted" });
  } catch (error) {
    return NextResponse.json({ message: "Failed to delete" }, { status: 500 });
  }
}
