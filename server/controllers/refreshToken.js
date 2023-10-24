import jwt from "jsonwebtoken";
import Users from "../models/userModel.js"

export const refreshToken = async (req, res) => {
    try {
        const refreshToken = req.cookies.refreshToken;
        if (!refreshToken) return res.sendStatus(401).json({ messgae: "نیاز به ورود  !" });

        const user = await Users.findAll({
            where: {
                refresh_token: refreshToken
            },
        })
        if (!user[0]) return res.sendStatus(403).json({ messgae: "عدم تطابق اطلاعات !!" })
        jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (error, decoded) => {
            if (error) return res.sendStatus(403).json({ messgae: "نیاز به ورود مجدد !!" })
            const { id, name, email, isAdmin } = user[0];
            const accessToken = jwt.sign(
                { id, name, email, isAdmin },
                process.env.ACCESS_TOKEN_SECRET,
                {
                    expiresIn: "5m"
                });
            res.json({ accessToken })
        });

    } catch (err) {
        console.log(err)
    }
}