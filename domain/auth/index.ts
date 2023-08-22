import { AuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import GithubProvider from "next-auth/providers/github";
import CredentialsProvider from "next-auth/providers/credentials";
import { compare } from "bcrypt";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { prisma } from "../db/prisma-client";

export const authOptions: AuthOptions = {
  adapter: PrismaAdapter(prisma),
  pages: {
    signIn: "/login",
  },
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: {},
        password: {},
      },
      authorize: async (credentials) => {
        if (!credentials?.email || !credentials?.password) {
          throw new Error("custom.invalidCredentials");
        }

        const user = await prisma.user.findUnique({
          where: { email: credentials?.email },
        });
        if (!user || !user.hashedPassword) {
          throw new Error("custom.noEmail");
        }

        const isPasswordCorrect = await compare(
          credentials.password,
          user.hashedPassword
        );
        if (!isPasswordCorrect) {
          throw new Error("custom.wrongPassword");
        }

        return user;
      },
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
    GithubProvider({
      clientId: process.env.GITHUB_ID as string,
      clientSecret: process.env.GITHUB_SECRET as string,
    }),
  ],
  callbacks: {
    jwt: ({ token, user }) => {
      if (user) {
        token = { ...token, user, id: user.id };
      }
      return token;
    },
    session: ({ session, token }) => {
      if (token && token.user) {
        session.user = token.user;
      }
      return session;
    },
  },
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 days session storage
  },
  secret: process.env.NEXTAUTH_SECRET,
};
