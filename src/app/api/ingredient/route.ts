import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/database/db";
import Ingredients from "@/database/ingredientSchema";
import Users from "@/database/userSchema";
import { authenticateUser } from "@/middleware/auth";

export async function POST(req: NextRequest) {
  await connectDB();
  try {
    const {
      userID,
      ingredientName,
      brand,
      vendor,
      unitType,
      numberUnits,
      price,
      pricePerUnit,
    } = await req.json();

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

    const newIngredient = await new Ingredients({
      userID,
      ingredientName,
      brand,
      vendor,
      unitType,
      numberUnits,
      price,
      pricePerUnit,
    }).save();

    // add the ingredient's ID to the ingredients array of the user object
    const updatedUser = await Users.findByIdAndUpdate(
      userID,
      { $push: { ingredients: newIngredient._id } },
      { new: true }
    );

    if (!updatedUser) {
      return NextResponse.json({ message: "Failed to add" });
    }
    return NextResponse.json(newIngredient);
  } catch (error) {
    console.log(error);
    return NextResponse.json(error, { status: 400 });
  }
}

// returns all ingredients
export async function GET(req: NextRequest, res: NextResponse) {
  await connectDB();
  
  //extract userID from query params
  const url = new URL(req.url);
  const userID = url.searchParams.get('userID');
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

    const user = await Users.findOne({ _id: userID }).exec();
    if (!user) {
      return NextResponse.json(
        { message: "Failed: User not found" },
        { status: 404 }
      );
    }

    const ingredients = await Ingredients.find({
      _id: { $in: user.ingredients }
    }).exec();

    // const ingredients = await Ingredients.find({userID: userID}).exec();
    return NextResponse.json(ingredients);
  } catch (error) {
    console.log(error);
    return NextResponse.json(error);
  }
}
