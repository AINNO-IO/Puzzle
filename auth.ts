import NextAuth from "next-auth"

import CredentialsProvider from "next-auth/providers/credentials";

import type { NextAuthConfig } from "next-auth"

export const config = {
  theme: {
    logo: "/citadele.svg",
  },
  providers: [
    CredentialsProvider({
      // The name to display on the sign in form (e.g. "Sign in with...")
      name: "Email",
      // `credentials` is used to generate a form on the sign in page.
      // You can specify which fields should be submitted, by adding keys to the `credentials` object.
      // e.g. domain, username, password, 2FA token, etc.
      // You can pass any HTML attribute to the <input> tag through the object.
      credentials: {
        username: { label: "Username", type: "text", required: true },
        password: { label: "Password", type: "password", required: true }
      },
      async authorize(credentials, req) {
        // Add logic here to look up the user from the credentials supplied
        const user = {
          data: { id: "1", name: "admin", email: process.env.ADMIN_EMAIL },
          password: process.env.ADMIN_PASSWORD
        }

        if (credentials.username === user.data.email && credentials.password === user.password) {
          // Any object returned will be saved in `user` property of the JWT
          return user.data
        } else {
          // If you return null then an error will be displayed advising the user to check their details.
          return null

          // You can also Reject this callback with an Error thus the user will be sent to the error page with the error message as a query parameter
        }
      }
    })
  ],
  callbacks: {
    authorized({ request, auth }) {
      const { pathname } = request.nextUrl
      if (pathname === "/admin") return !!auth
      if (pathname === "/admin/upload") return !!auth
      return true
    },
  },
} satisfies NextAuthConfig

export const { handlers, auth, signIn, signOut } = NextAuth(config)
