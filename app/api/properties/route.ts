import { NextResponse } from "next/server";
import { PropertyData } from "@/domain/types/property-data";
import { prisma } from "@/domain/db/prisma-client";
import { getServerSession } from "next-auth";
import { authOptions } from "@/domain/auth";
import { api } from "@/domain/remote";
import { getData } from "@/domain/remote/response/data";
import { TranslatorData } from "@/domain/types/translator-data";

export async function GET(request: Request) {
  const properties = await prisma.property.findMany({
    include: { address: true, categories: true },
    take: 6,
  });
  if (!properties) {
    return NextResponse.json("custom.noProperties", { status: 400 });
  }

  return NextResponse.json(properties);
}

export async function POST(request: Request) {
  const {
    name,
    description,
    price,
    imageSrc,
    quadrature,
    guestCount,
    roomCount,
    bathroomCount,
    includesKitchen,
    includesParking,
    categories,
    country,
    city,
    street,
    postalCode,
    county,
  }: PropertyData = await request.json();

  const session = await getServerSession(authOptions);
  const userId = session?.user?.id!;
  if (!session || !userId) {
    return NextResponse.json("custom.authenticated", { status: 400 });
  }

  const [
    { text: translatedName, from, to },
    { text: translatedDescription },
  ]: TranslatorData[] = await Promise.all([
    await api.post("translator", JSON.stringify(name)).then(getData),
    await api.post("translator", JSON.stringify(description)).then(getData),
  ]);

  try {
    await prisma.address.create({
      data: {
        country,
        city,
        street,
        postalCode,
        county,
        property: {
          create: {
            name: {
              [from]: name,
              [to]: translatedName ?? name,
            },
            description: {
              [from]: description,
              [to]: translatedDescription ?? description,
            },
            price,
            imageSrc: imageSrc!,
            quadrature,
            guestCount,
            roomCount,
            bathroomCount,
            includesKitchen,
            includesParking,
            userId,
            categoryIds: categories,
          },
        },
      },
    });
    return NextResponse.json({ message: "OK!" });
  } catch (error) {
    return NextResponse.json("custom.addProperty", { status: 400 });
  }
}
