import { NextRequest, NextResponse} from "next/server"
import connectDB from "@/database/db"
import Ingredients from "@/database/ingredientSchema";

export async function POST(req: NextRequest) {
    await connectDB();
    try {
        const {userID, ingredientName, vendor, unitType, numberUnits, price, pricePerUnit} = await req.json();

        if (!userID || !ingredientName || !vendor || !unitType || numberUnits <= 0 || price <= 0 || pricePerUnit <= 0) {
            return NextResponse.json({ message: "Invalid input, please check your data." }, { status: 400 });
        }

        const newIngredient = await new Ingredients({
            userID,
            ingredientName,
            vendor,
            unitType,
            numberUnits,
            price,
            pricePerUnit
        })
        await newIngredient.save();
        return NextResponse.json(newIngredient)
    }
    catch (error){
        console.log(error);
        return NextResponse.json(error, { status: 400 });
    }
}