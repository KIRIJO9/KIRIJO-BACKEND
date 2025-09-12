import jwt from 'jsonwebtoken';

export const authMiddleware = (req, res, next) => {
    const token = req.cookies.kirijo_cookie;
    if (!token) {
        return res.status(401).json({ error: "Access Denied. No token provided." });
    }
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = { userId: decoded.userId };
        next();
    } catch (err) {
        res.status(400).json({ error: "Invalid Token" });
    }
};