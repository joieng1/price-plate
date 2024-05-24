import { NextRequest, NextResponse } from 'next/server';
const jwt = require('jsonwebtoken');

export async function verifyToken(req: NextRequest) {
  const authHeader = req.headers.get('authorization');
  if (!authHeader) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }

  const token = authHeader.split(' ')[1];
  if (!token) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    return NextResponse.json({ message: "Authorized"}, {status: 202});
  } catch (error) {
    console.log(error)
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }
}

export function generateAccessToken(username: string): Promise<string> {
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