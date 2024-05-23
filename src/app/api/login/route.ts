import connectDB from "@/database/db";
import { NextRequest, NextResponse } from "next/server";
import Users from "@/database/userSchema";
const bcrypt = require("bcrypt");

export async function POST(req: NextRequest) {
  
  await connectDB();
  try {
    const { username, password } = await req.json();
    let errorMessage = null;

    if (!username || !password) {
      errorMessage = "Failed: Login Incomplete";
      return NextResponse.json({ message: errorMessage}, { status: 400 });
    }

    const user = await Users.findOne({ username: username }).orFail();
    const passwordsMatch = bcrypt.compareSync(password, user.password);

    if (!passwordsMatch) {
      errorMessage = "Failed: Login Failed";
      return NextResponse.json({ message: errorMessage }, { status: 400 });
    }

    return NextResponse.json({ message: "Success: Login Complete"});

  } catch (err) {
    return NextResponse.json(`${err}`, { status: 400 });
  }
}
