import type { NextAuthConfig } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { getUserByEmail } from "@/data/user";
import { LoginSchema } from "@/schema/schema";
import bcrypt from "bcryptjs";
import GitHub from "next-auth/providers/github";
import Google from "next-auth/providers/google";

// Notice this is only an object, not a full Auth.js instance
export default {
  providers: [
    Credentials({
      async authorize(credentials) {
        const validatedFiled = LoginSchema.safeParse(credentials);

        if (validatedFiled.success) {
          const { email, password } = validatedFiled.data;

          const user = await getUserByEmail(email);

          if (!user || !user.password) return null;

          const pwMatchHash = await bcrypt.compare(password, user.password);

          if (pwMatchHash) return user;
        }
        return null;
      },
    }),
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    GitHub({
      clientId: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
    }),
  ],
} satisfies NextAuthConfig;
