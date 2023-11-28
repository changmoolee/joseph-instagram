import NextAuth from "next-auth/next";
import type { NextAuthOptions as NextAuthConfig } from "next-auth";
import Google from "next-auth/providers/google";

export const authOptions = {
  providers: [
    Google({
      clientId: process.env.AUTH_GOOGLE_ID || "",
      clientSecret: process.env.AUTH_GOOGLE_SECRET || "",
    }),
  ],
  callbacks: {
    async jwt({ token }) {
      token.userRole = "admin";
      return token;
    },
  },
} satisfies NextAuthConfig;

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
