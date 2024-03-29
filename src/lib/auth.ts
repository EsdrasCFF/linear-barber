import { PrismaAdapter } from "@auth/prisma-adapter"
import { AuthOptions } from "next-auth"
import { database } from "./prisma"
import GoogleProvider from "next-auth/providers/google"
import { Adapter } from "next-auth/adapters";

export const authOptions: AuthOptions = {
  adapter: PrismaAdapter(database) as Adapter,
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  callbacks: {
    async session({session, token, user}) {
      session.user = {...session.user, id: user.id} as {id: string; email: string; name: string; image: string}
      
      return session;
    }
  },
  secret: process.env.NEXTAUTH_SECRET
};