import { AuthOptions } from "next-auth";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import GoogleProvider from "next-auth/providers/google";
import GithubProvider from "next-auth/providers/github";
import RedditProvider from "next-auth/providers/reddit";
import CredentialsProvider from "next-auth/providers/credentials";
import { compare } from "bcrypt";
import { User } from "@prisma/client";
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

        if (user.verificationToken || !user.emailVerified) {
          throw new Error("custom.notVerified");
        }

        return user;
      },
    }),
    // TODO: 🔨 add Google auth once request is resolved in the Google Console
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
    GithubProvider({
      clientId: process.env.GITHUB_ID as string,
      clientSecret: process.env.GITHUB_SECRET as string,
    }),
    RedditProvider({
      clientId: process.env.REDDIT_CLIENT_ID as string,
      clientSecret: process.env.REDDIT_CLIENT_SECRET as string,
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
        session.user = token.user as User;
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
