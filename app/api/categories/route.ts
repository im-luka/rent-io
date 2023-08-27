import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { prisma } from "@/domain/db/prisma-client";
import { CategoryData } from "@/domain/types/category-data";
import {
  DEFAULT_CATEGORY_EMOJI,
  DEFAULT_LOCALE,
  LOCALES,
} from "@/utils/constants";
import { api } from "@/domain/remote";
import { getData } from "@/domain/remote/response/data";

export async function GET(request: Request) {
  const categories = await prisma.category.findMany();
  if (!categories) {
    return NextResponse.json("custom.noCategories", { status: 400 });
  }

  return NextResponse.json(categories);
}

export async function POST(request: Request) {
  const { name, emoji }: CategoryData = await request.json();
  const reqLocale = cookies().get("NEXT_LOCALE")?.value ?? DEFAULT_LOCALE;
  const otherLocale = LOCALES.find((locale) => locale !== reqLocale)!;
  const otherName: string = await api
    .post("translator", {
      from: reqLocale,
      to: otherLocale,
      text: name,
    })
    .then(getData);

  try {
    await prisma.category.create({
      data: {
        name: {
          [reqLocale]: name,
          [otherLocale]: otherName ?? name,
        },
        emoji: emoji || DEFAULT_CATEGORY_EMOJI,
      },
    });
    return NextResponse.json({ message: "OK!" });
  } catch (error) {
    return NextResponse.json("custom.addCategory", { status: 400 });
  }
}
