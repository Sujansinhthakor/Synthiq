import type { NextFunction, Request, Response } from "express";
declare global {
    namespace Express {
        interface Request {
            user?: any;
        }
    }
}
declare const authMiddleware: (req: Request, res: Response, next: NextFunction) => any;
export default authMiddleware;
//# sourceMappingURL=auth.middleware.d.ts.map