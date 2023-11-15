const express = require("express");
const db = require("./config/DataBase.js");
const userRoutes = require("./routes/userRoute");
const categoryRoutes = require("./routes/categoryRoute.js");
const videoRoutes = require("./routes/videoRoute.js");
const newsRoutes = require("./routes/newsRoute.js");
const commentRoutes = require("./routes/commentsRoute.js");
const emailRoutes = require("./routes/emailMsgRoute.js");
const cookieParser = require("cookie-parser");
const fileUpload = require("express-fileupload");
const corse = require("cors");
const dotenv = require("dotenv");
dotenv.config();

const app = express();

app.use(corse({ credentials: true, origin: "http://localhost:5173" }))
app.use(express.json());
app.use(cookieParser());
app.use(fileUpload());
app.use(express.static('public'))

app.get('/',(req,res)=>{
    res.send(`<p>${process.env.ACCESS_TOKEN_SECRET}</P>`)
})
app.use(userRoutes)
app.use(categoryRoutes)
app.use(videoRoutes)
app.use(newsRoutes)
app.use(commentRoutes)
app.use(emailRoutes)



// middleware for set Error handling
app.use((error, req, res, next) => {
    const status = error.statusCode || 500;
    const message = error.message || 'خطایی رخ داده است';
    res.status(status).json({ message })
    next();
})
//*********************


try {
    db.authenticate();
    // db.sync()
    console.log("DataBase conencted")
    app.listen(5000, () => {
        console.log("server is running")
    })
} catch (error) {
    console.log(error)
}