import { hash } from "bcrypt";
import { PASSWORD_HASH_SALT } from "@/utils/constants";
import { RegisterData } from "@/domain/types/register-data";
import { prisma } from "@/domain/db/prisma-client";
import { NextResponse } from "next/server";
import { generateRandomToken } from "@/utils/token";
import mail, { MailDataRequired } from "@sendgrid/mail";

mail.setApiKey(process.env.SENDGRID_API_KEY as string);

export async function POST(request: Request) {
  const { firstName, lastName, email, password }: RegisterData =
    await request.json();
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

  if (user) {
    try {
      const data: MailDataRequired = {
        templateId: process.env.SENDGRID_VERIFY_EMAIL_TEMPLATE_ID as string,
        from: process.env.SENDGRID_FROM_EMAIL as string,
        to: user.email!,
        dynamicTemplateData: {
          userName: user.firstName,
          verifyUrlLink: `${process.env.NEXTAUTH_VERIFY_EMAIL_URL}?token=${user.verificationToken}`,
          baseUrlLink: process.env.NEXTAUTH_URL,
        },
      };
      await mail.send(data);
    } catch (error) {
      return NextResponse.json("custom.verificationEmail", { status: 400 });
    }
  }

  return NextResponse.json(user);
}
