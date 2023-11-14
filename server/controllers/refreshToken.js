const jwt = require("jsonwebtoken");
const Users = require("../models/userModel")


exports.refreshToken = async (req, res, next) => {
    const error = new Error()

    try {
        const refreshToken = req.cookies.refreshToken;
        if (!refreshToken) {
            error.statusCode = 401
            error.message = "لطفا وارد حساب خود شوید"
            return next(error)
        }

        const user = await Users.findAll({
            where: {
                refresh_token: refreshToken
            },
        })

        if (!user[0]) {
            error.message = "لطفا وارد حساب خود شوید"
            error.statusCode = 401
            return next(error)
        }

        jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (error, decoded) => {

            if (error) {
                error.statusCode = 401
                error.message = "نیاز به ورود مجدد !!"
                return next(error)
            }

            const { id, name, email, isAdmin, url } = user[0];
            const accessToken = jwt.sign(
                { id, name, email, isAdmin },
                process.env.ACCESS_TOKEN_SECRET,
                {
                    expiresIn: "5m"
                });
            res.status(200).json({ accessToken, url })
        });

    } catch (err) {
        next(err)
    }
}