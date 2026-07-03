import type { NextFunction, Request, Response } from "express";
declare global {
    namespace Express {
        interface Request {
            user?: any;
        }
    }
}
declare const authMiddleware: (req: Request, res: Response, next: NextFunction) => any;
declare const activeUsers: Set<string>;
declare const renderLimit: (req: Request, res: Response, next: NextFunction) => Response<any, Record<string, any>> | undefined;
export { authMiddleware, renderLimit, activeUsers };
//# sourceMappingURL=auth.middleware.d.ts.map