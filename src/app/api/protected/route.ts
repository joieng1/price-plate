import { NextRequest, NextResponse } from 'next/server';
import { authenticateUser } from '@/middleware/auth';
import Users from "@/database/userSchema";
const jwt = require('jsonwebtoken');

export async function POST(req: NextRequest){
    try{
        if (!process.env.JWT_SECRET) {
            return NextResponse.json({ message: "An error occurred. Please try again later." }, { status: 400 });
        }

        const verifytoken = await authenticateUser(req);
        const jsonData = await verifytoken.json();
        if (jsonData.message != "Authorized") {
            return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
        }

        const {userID} = await req.json();
        if (!userID) {
            return NextResponse.json({ message: "Unauthorized"}, { status: 400 });
        }
        
        try {
            await Users.findOne({ _id: userID }).orFail();
        } catch (error) {
            return NextResponse.json({ message: 'Unauthorized' }, { status: 400 });
        }

        console.log("Authorized to use page")
        return NextResponse.json({ message: "Page Authorized"}, {status: 200});
    }
    catch (error) {
        return NextResponse.json(`${error}`, { status: 400 });
    }
}