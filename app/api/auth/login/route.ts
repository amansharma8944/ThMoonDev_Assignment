import { NextRequest, NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';

const secret = process.env.JWT_SECRET || 'your-secret-key';

interface LoginRequestBody {
  username: string;
  password: string;
}

export async function POST(req: NextRequest) {
  try {
    const body: LoginRequestBody = await req.json();
    const { username, password } = body;
   

 
    if (username === 'admin' && password === 'admin') {
      const token = jwt.sign({ username }, secret, { expiresIn: '1h' });
      return NextResponse.json({ token });
    } else {
      return NextResponse.json({ message: 'Invalid credentials' }, { status: 401 });
    }
  } catch (error) {
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
}
