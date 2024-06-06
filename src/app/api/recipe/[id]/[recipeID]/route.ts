import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/database/db";
import Recipes from "@/database/recipeSchema";
import Users from "@/database/userSchema";
import { authenticateUser } from "@/middleware/auth";

// Delete an ingredient from a recipe
export async function DELETE(req: NextRequest, { params }: any) {
  await connectDB();
  const { id, recipeID } = params; // Get recipe ID and ingredient ID from params

  try {
    if (!process.env.JWT_SECRET) {
      return NextResponse.json(
        { message: "An error occurred. Please try again later." },
        { status: 400 }
      );
    }

    const verifytoken = await authenticateUser(req);
    const jsonData = await verifytoken.json();
    if (jsonData.message !== "Authorized") {
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

    // Find the ingredient to be removed
    const ingredientToRemove = recipe.recipeIngredients.find(
      (ing: any) => ing.ingredientID.toString() === recipeID
    );

    if (!ingredientToRemove) {
      return NextResponse.json(
        { message: "Ingredient not found in recipe" },
        { status: 404 }
      );
    }

    // Remove the ingredient from the recipe's ingredients array
    recipe.recipeIngredients = recipe.recipeIngredients.filter(
      (ing: any) => ing.ingredientID.toString() !== recipeID
    );

    // Update the total cost of the recipe
    recipe.totalCost = recipe.recipeIngredients.reduce(
      (total: number, ingredient: any) =>
        total + ingredient.price,
      0
    );

    // Save the updated recipe
    await recipe.save();

    return NextResponse.json({
      message: "Ingredient deleted from recipe and total cost updated",
    });
  } catch (error) {
    console.error("Error deleting ingredient:", error);
    return NextResponse.json(
      { message: "Failed to delete ingredient" },
      { status: 500 }
    );
  }
}
