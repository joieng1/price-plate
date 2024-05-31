import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/database/db";
import Ingredients from "@/database/ingredientSchema";
import { authenticateUser } from "@/middleware/auth";
import Users from "@/database/userSchema";

// returns specific ingredient
export async function GET(req: NextRequest, { params }: any) {
  const { id } = params; // Extract the id from params
  try {
    //authentication check
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

    const user = await authenticateUser(req);
    if (!user) {
      return NextResponse.json(
        { message: "Failed: Unauthorized" },
        { status: 401 }
      );
    }
    const ingredient = await Ingredients.findById(id).orFail();
    return NextResponse.json(ingredient);
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: "Ingredient not found" },
      { status: 404 }
    );
  }
}

//updates ingredient
export async function PUT(req: NextRequest, { params }: any) {
  await connectDB();
  const { id } = params;
  try {
    const body = await req.json();
    //authentication check
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

    const user = await authenticateUser(req);
    if (!user) {
      return NextResponse.json(
        { message: "Failed: Unauthorized" },
        { status: 401 }
      );
    }

    const currentIngredient = await Ingredients.findById(id);
    const updatedFields = {
      ingredientName: body.ingredientName || currentIngredient.ingredientName,
      brand: body.brand || currentIngredient.brand,
      vendor: body.vendor || currentIngredient.vendor,
      unitType: body.unitType || currentIngredient.unitType,
      numberUnits: body.numberUnits || currentIngredient.numberUnits,
      price: body.price || currentIngredient.price,
      pricePerUnit: body.pricePerUnit || currentIngredient.pricePerUnit,
    };
    const ingredient = await Ingredients.findByIdAndUpdate(id, {
      $set: updatedFields,
    }, {new: true});
    return NextResponse.json(ingredient);
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
      const ingredient = await Ingredients.findById(id);
  
      if (!ingredient) {
        return NextResponse.json(
          { message: "Recipe not found" },
          { status: 404 }
        );
      }

    await Ingredients.findByIdAndDelete(id);
    await Users.findByIdAndUpdate(ingredient.userID, { $pull: { ingredients: id } });
    return NextResponse.json({ message: "Deleted" });
  } catch (error) {
    return NextResponse.json({ message: "Failed to delete" }, { status: 500 });
  }
}