import { unstable_getServerSession } from 'next-auth/next';
import { authOptions } from '../../pages/api/auth/[...nextauth]';
import { NextApiHandler, NextApiRequest, NextApiResponse } from 'next';

class UnauthorizedException extends Error {
  constructor() {
    super('Unauthorized');
  }
}

const checkAuth = async (req, res) => {
  const session = await unstable_getServerSession(req, res, authOptions);

  if (!session) {
    if (req.headers.nextauth_bypass === process.env.NEXTAUTH_BYPASS) {
      console.log('Utilizing bypass');
    } else {
      throw new UnauthorizedException();
    }
  }
};

export const withAuthMiddleware = (handler: NextApiHandler) => {
  return async (req: NextApiRequest, res: NextApiResponse) => {
    try {
      await checkAuth(req, res);
      return handler(req, res);
    } catch (err) {
      if (err instanceof UnauthorizedException) {
        return res.status(401).end('Unauthorized');
      }
    }
  };
};
