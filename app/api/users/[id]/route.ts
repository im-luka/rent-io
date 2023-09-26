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
    const user = await prisma.user.findUnique({
      where: { id },
      include: { properties: { include: { address: true, categories: true } } },
    });
    return NextResponse.json(user);
  } catch (err) {
    return NextResponse.json("custom.noUser", { status: 400 });
  }
}
