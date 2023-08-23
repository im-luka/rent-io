import { hash } from "bcrypt";
import { PASSWORD_HASH_SALT } from "@/utils/constants";
import { RegisterData } from "@/domain/types/register-data";
import { prisma } from "@/domain/db/prisma-client";
import { NextResponse } from "next/server";
import { generateRandomToken } from "@/utils/token";

export async function POST(request: Request) {
  const data: RegisterData = await request.json();
  const { firstName, lastName, email, password } = data;
  const name = firstName.concat(" ", lastName);
  const verificationToken = generateRandomToken();

  const hashedPassword = await hash(password, PASSWORD_HASH_SALT);
  const user = await prisma.user.create({
    data: {
      firstName,
      lastName,
      name,
      email,
      hashedPassword,
      verificationToken,
    },
  });

  return NextResponse.json(user);
}
