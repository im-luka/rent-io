import { NextResponse } from "next/server";
import { PropertyData } from "@/domain/types/property-data";
import { prisma } from "@/domain/db/prisma-client";

export async function POST(request: Request) {
  const data: PropertyData = await request.json();
  // return NextResponse.json("custom.noEmail", { status: 400 });

  console.log(request);

  try {
    // await prisma.property.create({
    //   data: {

    //   }
    // })

    return NextResponse.json({ message: "OK!" });
  } catch (error) {
    return NextResponse.json("custom.addProperty", { status: 400 });
  }
}
