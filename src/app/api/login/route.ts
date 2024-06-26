import connectDB from "@/database/db";
import { NextRequest, NextResponse } from "next/server";
import Users from "@/database/userSchema";
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');
import { generateAccessToken } from "@/middleware/auth";

export async function POST(req: NextRequest) {
  
  await connectDB();
  let user;
  let errorMessage = null;

  try {
    const { username, password } = await req.json();
    
    if (!process.env.JWT_SECRET) {
      errorMessage = "An error occurred. Please try again later.";
      return NextResponse.json({ message: errorMessage }, { status: 400 });
    }

    if (!username || !password) {
      errorMessage = "Failed: Login Incomplete";
      return NextResponse.json({ message: errorMessage}, { status: 400 });
    }

    try {
      user = await Users.findOne({ username: username }).orFail();
    } catch (error) {
      return NextResponse.json({ message: 'Failed: Login Failed' }, { status: 400 });
    }

    const passwordsMatch = bcrypt.compareSync(password, user.password);
    if (!passwordsMatch) {
      errorMessage = "Failed: Login Failed";
      return NextResponse.json({ message: errorMessage }, { status: 400 });
    }

    const token = await generateAccessToken(username);
    console.log("Generated Token and Login Success");
    return NextResponse.json({ message: "Success: Login Complete", token, userID: user._id.toString() });

  } catch (err) {
    return NextResponse.json(`${err}`, { status: 400 });
  }
}

