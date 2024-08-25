import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  return NextResponse.json({ success: false, message: 'This endpoint is no longer in use. Please use the Lambda function for file uploads.' }, { status: 400 });
}