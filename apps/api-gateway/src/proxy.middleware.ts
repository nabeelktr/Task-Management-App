import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { createProxyMiddleware, Options } from 'http-proxy-middleware';

interface CustomOptions extends Options {
  onProxyReq?: (proxyReq: any, req: Request, res: Response) => void;
}

const createProxy = (target: string): any => {
  const options: CustomOptions = {
    target,
    changeOrigin: true,
    onProxyReq: (proxyReq, req, res) => {
      proxyReq.setHeader('X-Special-Proxy-Header', 'NestJS-Proxy');
    },
  };

  const proxy = createProxyMiddleware(options);

  return (req: Request, res: Response, next: NextFunction) => {
    proxy(req, res, (err) => {
      if (err) {
        console.error(`Error proxying request to ${target}:`, err.message);
        res.status(500).send('Proxy error');
      } else {
        next();
      }
    });
  };
};

@Injectable()
export class ProxyMiddleware implements NestMiddleware {
  private authService = createProxy(process.env.AUTH_SERVICE_URL || 'http://localhost:3001/api/auth');
  private taskService = createProxy(process.env.COMPANY_SERVICE_URL || 'http://localhost:3003/api/task');

  use(req: Request, res: Response, next: NextFunction) {
    if (req.path.startsWith('/api/auth')) {
      return this.authService(req, res, next);
    }
    if (req.path.startsWith('/api/task')) {
      return this.taskService(req, res, next);
    }
    next();
  }
}
