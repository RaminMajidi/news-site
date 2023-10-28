import express from "express";
import db from "./config/DataBase.js";
import userRoutes from "./routes/userRoute.js";
import categoryRoutes from "./routes/categoryRoute.js";
import videoRoutes from "./routes/videoRoute.js";
import newsRoutes from "./routes/newsRoute.js";
import commentRoutes from "./routes/commentsRoute.js";
import emailRoutes from "./routes/emailMsgRoute.js";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import fileUpload from "express-fileupload";
import corse from "cors"



dotenv.config();
const app = express();

app.use(corse({ credentials: true, origin: "http://localhost:5173" }))
app.use(express.json());
app.use(cookieParser());
app.use(fileUpload());
app.use(express.static('public'))




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
    res.status(status).json({message})
    next();
})
//*********************


try {
    await db.authenticate();
    // await db.sync()

    console.log("DataBase conencted")

    app.listen(5000, () => {
        console.log("server is running")
    })
} catch (error) {
    console.log(error)
}