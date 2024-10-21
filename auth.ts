import NextAuth from "next-auth";
import authConfig from "@/auth.config";

import { PrismaAdapter } from "@auth/prisma-adapter";
import { db } from "@/lib/db";
import { getUserById } from "./data/user";

export const { handlers, auth, signIn, signOut } = NextAuth({
  callbacks:{
    async signIn({ user, account }) {
      if (account?.provider !== "credentials") return true;

      const existingUser = await getUserById(user.id || "");

      if (!existingUser?.emailVerified) return false;

      return true;
    },
  },
  events: {
    async linkAccount({ user }) {
      console.log("kirkhar");
      await db.user.update({
        where: { id: user.id },
        data: { emailVerified: new Date() },
      });
    },
  },
  adapter: PrismaAdapter(db),
  session: { strategy: "jwt" },
  ...authConfig,
});
