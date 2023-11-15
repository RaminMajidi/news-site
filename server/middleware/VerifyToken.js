const Jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();

async function verifyToken(req, res, next) {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];
    const error = new Error()
    if (token === null) {
        error.statusCode = 401
        error.message = 'ابتدا واردحساب کاربری خود شوید!'
        return next(error)
    }
    Jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
        if (err) {
            error.statusCode = 403
            error.message = "شما مجوز دسترسی به این صفحه را ندارید"
            return next(error)
        }
        req.userId = decoded.id;
        next();
    })
}

module.exports = {verifyToken}