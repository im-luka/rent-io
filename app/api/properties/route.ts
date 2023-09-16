import { NextResponse } from "next/server";
import { PropertyData } from "@/domain/types/property-data";

export async function POST(request: Request) {
  const data: PropertyData = await request.json();
  // return NextResponse.json("custom.noEmail", { status: 400 });
  console.log(data);

  return NextResponse.json({ message: "OK!" });
}
