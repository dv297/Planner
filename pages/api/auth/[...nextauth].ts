import { NextApiHandler } from 'next';
import NextAuth, { SessionStrategy } from 'next-auth';
import { PrismaAdapter } from '@next-auth/prisma-adapter';
import GitHubProvider from 'next-auth/providers/github';

import prisma from '../../../src/lib/prisma';

const authHandler: NextApiHandler = (req, res) =>
  NextAuth(req, res, authOptions);

export default authHandler;

export const authOptions = {
  providers: [
    GitHubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),
  ],
  adapter: PrismaAdapter(prisma),
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: 'jwt' as SessionStrategy, // See https://next-auth.js.org/configuration/nextjs#caveats, middleware (currently) doesn't support the "database" strategy which is used by default when using an adapter (https://next-auth.js.org/configuration/options#session)
  },
  callbacks: {
    async session({ session, token, user }) {
      const userFromDatabase = await prisma.user.findUnique({
        where: {
          id: token.sub,
        },
      });

      return {
        userId: userFromDatabase.id,
        ...session,
      };
    },
  },
};
