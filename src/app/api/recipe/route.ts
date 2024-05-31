import { NextRequest, NextResponse} from "next/server"
import connectDB from "@/database/db"
import Users from "@/database/userSchema";

export async function POST(req: NextRequest) {
  await connectDB();
  try {
    const {userID, recipeName, recipeIngredients, totalCost} = await req.json();
    const newRecipe = {
      recipeName,
      recipeIngredients,
      totalCost
    };

    // upload recipe to user
    const updatedUser = await Users.findByIdAndUpdate(
      userID,
      { $push: { recipes: newRecipe } },
      { new: true }
    );

    if (!updatedUser) {
      return NextResponse.json({message: "Failed to add"});
    }

    return NextResponse.json(newRecipe)
  } catch (error) {
    console.log(error);
    return NextResponse.json(error, { status: 400 });
  }
}