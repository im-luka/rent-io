import { authOptions } from "@/domain/auth";
import { prisma } from "@/domain/db/prisma-client";
import {
  FavoriteAction,
  generateFavorites,
  isPropertyFavored,
} from "@/utils/user";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

export async function PUT(request: NextRequest) {
  const propertyId: string = await request.json();
  if (!propertyId) {
    return NextResponse.json("custom.propertyId", { status: 400 });
  }

  const session = await getServerSession(authOptions);
  const user = session?.user;
  if (!session || !user) {
    return NextResponse.json("custom.authenticated", { status: 400 });
  }

  const isFavored = isPropertyFavored(user.favoriteIds, propertyId);
  const favoriteIds = generateFavorites(user.favoriteIds, propertyId);
  await prisma.user.update({
    where: { id: user.id },
    data: { favoriteIds },
  });

  return NextResponse.json(
    isFavored ? FavoriteAction.REMOVED : FavoriteAction.ADDED
  );
}
