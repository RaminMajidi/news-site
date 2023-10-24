import Jwt from "jsonwebtoken";

export const  verifyToken = (req,res,next) =>{
const authHeader = req.headers["authorization"];
const token = authHeader && authHeader.split(" ")[1];
if(token == null) return res.status(401).json("ابتدا واردحساب کاربری خود شوید!")
Jwt.verify(token,process.env.ACCESS_TOKEN_SECRET,(err,decoded)=>{
    if(err) return res.json("شما مجوز دسترسی به این صفحه را ندارید")
    next();
})
} 