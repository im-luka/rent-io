import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/domain/db/prisma-client";

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const { id } = params;
  if (!id) {
    return NextResponse.json("custom.providedId");
  }

  const user = await prisma.user.findUnique({
    where: { id },
    include: { properties: { include: { address: true, categories: true } } },
  });
  if (!user) {
    return NextResponse.json("custom.noUser");
  }

  return NextResponse.json(user);
}
