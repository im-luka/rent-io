import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/domain/db/prisma-client";
import { CategoryData } from "@/domain/types/category-data";
import { api } from "@/domain/remote";
import { getData } from "@/domain/remote/response/data";
import { TranslatorData } from "@/domain/types/translator-data";
import { DEFAULT_CATEGORY_EMOJI } from "@/utils/constants";

export async function GET(request: NextRequest) {
  const categories = await prisma.category.findMany();
  if (!categories) {
    return NextResponse.json("custom.noCategories", { status: 400 });
  }

  return NextResponse.json(categories);
}

export async function POST(request: NextRequest) {
  const { name, emoji }: CategoryData = await request.json();

  const { text, from, to }: TranslatorData = await api
    .post("translator", JSON.stringify(name))
    .then(getData);

  try {
    await prisma.category.create({
      data: {
        name: {
          [from]: name,
          [to]: text ?? name,
        },
        emoji: emoji || DEFAULT_CATEGORY_EMOJI,
      },
    });
    return NextResponse.json({ message: "OK!" });
  } catch (error) {
    return NextResponse.json("custom.addCategory", { status: 400 });
  }
}
