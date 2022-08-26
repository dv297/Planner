import { withAuth } from 'next-auth/middleware';
import { authOptions } from './pages/api/auth/[...nextauth]';

export default withAuth({
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    authorized: async ({ req, token }) => {
      const pathname = req.nextUrl.pathname;

      if (pathname.startsWith('/_next') || pathname === '/favicon.ico')
        return true;

      if (pathname.startsWith('/app')) {
        return !!token;
      }

      return true;
    },
  },
});
