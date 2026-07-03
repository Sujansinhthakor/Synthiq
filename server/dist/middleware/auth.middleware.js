import jwt from "jsonwebtoken";
const authMiddleware = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(401).json({ error: "Unauthorized: Missing or invalid token" });
    }
    const token = authHeader.split(" ")[1];
    if (!token) {
        res.send("Token not provided");
        return;
    }
    try {
        const decoded = jwt.verify(token, process.env.NEXTAUTH_SECRET);
        console.log(decoded);
        req.user = decoded;
        next();
    }
    catch (error) {
        return res.status(401).json({ error: "Unauthorized: Invalid token" });
    }
};
const activeUsers = new Set();
const renderLimit = (req, res, next) => {
    const email = req.user.email;
    if (activeUsers.has(email)) {
        return res.status(429).json({ error: "Too many requests" });
    }
    activeUsers.add(email);
    res.on("close", () => {
        activeUsers.delete(email);
    });
    next();
};
export { authMiddleware, renderLimit, activeUsers };
//# sourceMappingURL=auth.middleware.js.map