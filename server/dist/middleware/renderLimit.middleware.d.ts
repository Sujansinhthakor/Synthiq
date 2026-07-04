import type { NextFunction, Request, Response } from "express";
declare const activeUsers: Set<string>;
declare const renderLimit: (req: Request, res: Response, next: NextFunction) => Response<any, Record<string, any>> | undefined;
export { renderLimit, activeUsers };
//# sourceMappingURL=renderLimit.middleware.d.ts.map