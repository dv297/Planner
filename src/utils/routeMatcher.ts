import { NextApiRequest, NextApiResponse } from 'next';

interface RouteHandler {
  GET?: (req: NextApiRequest, res: NextApiResponse) => void;
  PUT?: (req: NextApiRequest, res: NextApiResponse) => void;
  DELETE?: (req: NextApiRequest, res: NextApiResponse) => void;
  POST?: (req: NextApiRequest, res: NextApiResponse) => void;
}

const validateRequest = (
  req: NextApiRequest,
  res: NextApiResponse,
  handler: RouteHandler
) => {
  if (!handler[req.method as keyof RouteHandler]) {
    return res.status(400).json({ error: 'Unsupported method ' });
  }
};

const routeMatcher = async (
  req: NextApiRequest,
  res: NextApiResponse,
  handler: RouteHandler
): Promise<any> => {
  validateRequest(req, res, handler);
  switch (req.method) {
    case 'GET': {
      return handler.GET?.(req, res);
    }
    case 'PUT': {
      return handler.PUT?.(req, res);
    }
    case 'DELETE': {
      return handler.DELETE?.(req, res);
    }
    case 'POST': {
      return handler.POST?.(req, res);
    }
  }
};

export default routeMatcher;
