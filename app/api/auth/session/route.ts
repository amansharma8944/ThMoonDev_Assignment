import { NextRequest, NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';

const secret = process.env.JWT_SECRET || 'your-secret-key';

interface JwtPayload {
  username: string;
}

export async function GET(req: NextRequest) {
  const authHeader = req.headers.get('authorization');
  console.log(authHeader)

  if (!authHeader) {
    return NextResponse.json({ message: 'No token provided' }, { status: 401 });
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = jwt.verify(token, secret) as JwtPayload;
    return NextResponse.json({ user: { username: decoded.username } });
  } catch (error) {
    return NextResponse.json({ message: 'Invalid or expired token' }, { status: 401 });
  }
}
