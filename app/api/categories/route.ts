import { NextResponse } from "next/server";
import { prisma } from "@/domain/db/prisma-client";

export async function GET(request: Request) {
  const categories = await prisma.category.findMany();
  if (!categories) {
    return NextResponse.json("custom.noCategories", { status: 400 });
  }

  return NextResponse.json(categories);
}
