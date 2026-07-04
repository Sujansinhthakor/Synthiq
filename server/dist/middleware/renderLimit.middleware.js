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
export { renderLimit, activeUsers };
//# sourceMappingURL=renderLimit.middleware.js.map