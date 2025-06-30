/* eslint-disable @typescript-eslint/no-explicit-any */
import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";
import { ApiPath, API_BASE_URL } from "@/lib/api";

const authOptions = {
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials: any) {
        if (!credentials?.username || !credentials?.password) {
          return null;
        }
        try {
          const response = await fetch(`${API_BASE_URL}${ApiPath.adminLogin}`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ userName: credentials.username, password: credentials.password }),
          });
          if (!response.ok) return null;
          const data = await response.json();
          if (data.success && data.result && data.result.user && data.result.accessToken) {
            return {
              id: data.result.user._id,
              userName: data.result.user.userName,
              accessToken: data.result.accessToken,
              user: data.result.user,
            };
          }
          return null;
        } catch {
          return null;
        }
      },
    }),
  ],
  pages: {
    signIn: "/en/login",
  },
  callbacks: {
    async jwt({ token, user }: any) {
      if (user) {
        token.accessToken = user.accessToken;
        token.userData = user.user;
        token._id = user.user._id;
        token.userName = user.user.userName;
      }
      return token;
    },
    async session({ session, token }: any) {
      if (token?.accessToken) {
        session.accessToken = token.accessToken;
      }
      if (token?.userData) {
        session.user = {
          _id: token._id,
          userName: token.userName,
          name: token.userName, // Also set as name for compatibility
          ...token.userData
        };
      }
      return session;
    },
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST }; 