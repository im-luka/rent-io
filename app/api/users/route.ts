import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  // TODO: profile page

  return NextResponse.json({ message: "OK!" });
}
