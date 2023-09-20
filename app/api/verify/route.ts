import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/domain/db/prisma-client";

export async function POST(request: NextRequest) {
  const token: string = await request.json();
  if (!token) {
    return NextResponse.json("custom.noToken", { status: 400 });
  }

  const user = await prisma.user.findFirst({
    where: {
      verificationToken: token,
    },
  });
  if (!user) {
    return NextResponse.json("custom.invalidToken", { status: 400 });
  }

  await prisma.user.update({
    where: { id: user.id },
    data: {
      emailVerified: new Date(),
      verificationToken: null,
    },
  });

  return NextResponse.json({ message: "OK!" });
}
