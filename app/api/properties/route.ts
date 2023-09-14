import { PropertyData } from "@/domain/types/property-data";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const data: PropertyData = await request.json();
  console.log(data);

  return NextResponse.json({ message: "OK!" });
}
