import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import prisma from "@/lib/prisma";
import * as bcrypt from "bcryptjs";

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
    {
      id: "saturnrcc",
      name: "SaturnRCC",
      type: "oauth",
      clientId: process.env.CUSTOM_OAUTH_CLIENT_ID!,
      clientSecret: process.env.CUSTOM_OAUTH_CLIENT_SECRET!,
      authorization: process.env.CUSTOM_OAUTH_AUTHORIZATION_URL!,
      token: process.env.CUSTOM_OAUTH_TOKEN_URL!,
      userinfo: process.env.CUSTOM_OAUTH_USERINFO_URL!,
      profile(profile: { id: string; name: string; email: string }) {
        return {
          id: profile.id,
          name: profile.name,
          email: profile.email,
          image: null,
        };
      },
    },
    CredentialsProvider({
      id: "credentials",
      name: "credentials",
      credentials: {
        email: { label: "email", type: "text" },
        password: { label: "password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null;
        }

        const user = await prisma.user.findUnique({
          where: {
            email: credentials.email,
          },
        });

        if (!user) {
          return null;
        }

        // Check if user.password is not null before comparing
        if (!user.password) {
          return null;
        }
        const passwordsMatch = await bcrypt.compare(
          credentials.password,
          user.password
        );

        if (!passwordsMatch) {
          return null;
        }

        return user;
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
  debug: process.env.NODE_ENV === "development",
  pages: {
    signIn: "/login",
  },
};
