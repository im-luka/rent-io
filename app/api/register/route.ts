import { hash } from "bcrypt";
import { PASSWORD_HASH_SALT } from "@/utils/constants";
import { RegisterData } from "@/domain/types/register-data";
import { prisma } from "@/domain/db/prisma-client";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const data: RegisterData = await request.json();
  const { firstName, lastName, email, password } = data;

  const hashedPassword = await hash(password, PASSWORD_HASH_SALT);
  const user = await prisma.user.create({
    data: { firstName, lastName, email, hashedPassword },
  });

  return NextResponse.json(user);
}
