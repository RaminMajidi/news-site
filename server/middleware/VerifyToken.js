import Jwt from "jsonwebtoken";

export const verifyToken = (req, res, next) => {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];
    if (token == null) return res.status(401).json({ message: "ابتدا واردحساب کاربری خود شوید!" })
    Jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
        if (err) return res.status(403).json({ error: "شما مجوز دسترسی به این صفحه را ندارید" })
        req.userId = decoded.id;
        next();
    })
} 