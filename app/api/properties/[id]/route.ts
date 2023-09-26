import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/domain/db/prisma-client";

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const { id } = params;
  if (!id) {
    return NextResponse.json("custom.providedId", { status: 400 });
  }

  try {
    const property = await prisma.property.findUnique({
      where: { id },
      include: { address: true, categories: true, user: true },
    });
    return NextResponse.json(property);
  } catch (err) {
    return NextResponse.json("custom.noProperty", { status: 400 });
  }
}
