import type { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { authApiClient } from "./axios";
import axios from "axios";

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null;
        }

        try {
          const response = await axios.post(
            process.env.NEXT_PUBLIC_API_AUTH_URL + "/moneytree/login",
            {
              email: credentials.email,
              password: credentials.password,
            },
            {
              headers: {
                "Content-Type": "application/json",
              },
            }
          );

          const { AccessToken, RefreshToken, IdToken } = response.data;
          const payload = JSON.parse(atob(IdToken.split(".")[1]));

          return {
            id: payload.sub,
            name: `${payload.given_name ?? ""} ${payload.family_name ?? ""}`.trim(),
            email: payload.email ?? credentials.email,
            image: payload.picture ?? null,
            accessToken: AccessToken,
            refreshToken: RefreshToken,
            idToken: IdToken,
          };
        } catch (error: any) {
          console.error(
            "Authorization error:",
            error?.response?.data || error.message
          );

          throw new Error(
            error?.response?.data?.message ||
              "Erreur serveur lors de la connexion"
          );
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.accessToken = user.accessToken;
        token.refreshToken = user.refreshToken;
        token.idToken = user.idToken;
        token.id = user.id;
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user.id = token.id as string;
        session.accessToken = token.accessToken as string;
        session.refreshToken = token.refreshToken as string;
        session.idToken = token.idToken as string;
      }
      return session;
    },
  },
  pages: {
    signIn: "/auth/login",
    error: "/auth/error",
  },
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60,
  },
  secret: process.env.NEXTAUTH_SECRET,
};
