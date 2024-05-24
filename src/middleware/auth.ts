import { NextRequest, NextResponse } from 'next/server';
const jwt = require('jsonwebtoken');

export async function generateAccessToken(username: string): Promise<string> {
  return new Promise((resolve, reject) => {
    jwt.sign({username}, process.env.JWT_SECRET, {expiresIn: "1d"}, 
      (error: Error, token: string) => {
        if(error) reject(error);
        else resolve(token);
      }
    )
  })
}

export async function authenticateUser(req: NextRequest) {
  const authHeader = req.headers.get('authorization');
  if (!authHeader) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }

  const token = authHeader.split(' ')[1];
  if (!token) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }

  try {
    const decoded = await new Promise((resolve, reject) => {
      jwt.verify(token, process.env.JWT_SECRET, (error: Error | null, decoded: any) => {
        if (error) reject(error);
        else resolve(decoded);
      });
    });
    
    return NextResponse.json({ message: 'Authorized' }, { status: 200 });
  } catch (error) {
    console.log(error)
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }
}