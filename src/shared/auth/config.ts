import type { NextAuthConfig } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import type { JWT } from "next-auth/jwt";
import { API_URL } from "@shared/config/api";

async function refreshAccessToken(token: JWT): Promise<JWT> {
  try {
    const response = await fetch(`${API_URL}/auth/refresh`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        refreshToken: token.refreshToken,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw data;
    }

    return {
      ...token,
      accessToken: data.accessToken,
      accessTokenExpires: Date.now() + 60 * 60 * 1000,
    };
  } catch {
    return {
      ...token,
      error: "RefreshAccessTokenError",
    };
  }
}

export const authConfig = {
  secret: process.env.AUTH_SECRET,

  providers: [
    Credentials({
      credentials: {
        email: {},
        password: {},
      },

      async authorize(credentials) {
        const res = await fetch(`${API_URL}/auth/login`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            email: credentials?.email,
            password: credentials?.password,
          }),
        });

        const data = await res.json();

        if (!res.ok) {
          return null;
        }

        return {
          id: data.user.id,
          email: data.user.email,
          accessToken: data.accessToken,
          refreshToken: data.refreshToken,
        };
      },
    }),
  ],

  pages: {
    signIn: "/login",
  },

  session: {
    strategy: "jwt",
  },

  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.user = {
          id: user.id,
          email: user.email,
        };

        token.accessToken = user.accessToken;
        token.refreshToken = user.refreshToken;
        token.accessTokenExpires = Date.now() + 60 * 60 * 1000;
      }

      if (typeof token.accessTokenExpires === "number" && Date.now() > token.accessTokenExpires) {
        return refreshAccessToken(token);
      }

      return token;
    },

    async session({ session, token }) {
      session.user = {
        ...session.user,
        ...token.user,
      };

      session.accessToken = token.accessToken;
      session.error = token.error;

      return session;
    },

    authorized({ auth, request }) {
      const isLoggedIn = !!auth?.user;
      const isPublicRoute = request.nextUrl.pathname.startsWith("/login");

      if (isPublicRoute) {
        return !isLoggedIn;
      }

      return isLoggedIn;
    },
  },
} satisfies NextAuthConfig;
