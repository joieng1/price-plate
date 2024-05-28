import connectDB from "@/database/db";
import { NextRequest, NextResponse } from "next/server";
import Users, { IUser } from "@/database/userSchema";
const bcrypt = require("bcrypt");
import { generateAccessToken } from "@/middleware/auth";

export async function POST(req: NextRequest) {
    await connectDB();
    try {
        const { firstName, lastName, email, username, password, recipes, ingredients}: IUser = await req.json();
        if (!firstName || !lastName || !email || !username || !password || !recipes || !ingredients){
            return NextResponse.json({message: "Failed: Invalid User"}, { status: 404 });
        }

        const salt = bcrypt.genSaltSync(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        const newUser = new Users({firstName: firstName, lastName: lastName, email: email, username: username, 
            password: hashedPassword, recipes: recipes, ingredients: ingredients});
        await newUser.save();
        
        const token = await generateAccessToken(username.toString());
        console.log("Generated Token and Signup Success");
        return NextResponse.json({message: "Success: Signup Complete", token}, { status: 201 });

    } catch (err) {
        return NextResponse.json(`${err}`, { status: 400 });
    }
}