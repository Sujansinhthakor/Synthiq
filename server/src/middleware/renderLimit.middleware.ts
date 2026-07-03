import type { NextFunction, Request, Response } from "express";

const activeUsers = new Set<string>();

const renderLimit = (req: Request, res: Response, next: NextFunction) => {
    const email = req.user.email;

    if (activeUsers.has(email)) {
        return res.status(429).json({ error: "Too many requests" });
    }

    activeUsers.add(email);

    res.on("close", () => {
        activeUsers.delete(email);
    });

    next();
}
export { renderLimit, activeUsers }