import connectDB from "@/database/db";
import { NextRequest, NextResponse } from "next/server";
import Users from "@/database/userSchema";
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');
import { verifyToken } from "@/middleware/auth";

export async function POST(req: NextRequest) {
  
  await connectDB();
  
  // const authResult = await verifyToken(req);
  // if (authResult instanceof NextResponse) {
  //   return authResult;
  // }

  try {
    const { username, password } = await req.json();
    let user;
    let errorMessage = null;
    
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
    return NextResponse.json({ message: "Success: Login Complete", token });

  } catch (err) {
    return NextResponse.json(`${err}`, { status: 400 });
  }
}

function generateAccessToken(username: string): Promise<string> {
  return new Promise((resolve, reject) => {
    jwt.sign(
      { username },
      process.env.JWT_SECRET as string,
      { expiresIn: '1d' },
      (error: Error | null, token: string | undefined) => {
        if (error) reject(error);
        else resolve(token as string);
      }
    );
  });
}
