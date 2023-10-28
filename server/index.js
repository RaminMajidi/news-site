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

app.use(corse({ credentials: true, origin:"http://localhost:5173"}))
app.use(express.json());
app.use(cookieParser());
app.use(fileUpload());
app.use(express.static('public'))


try {
    await db.authenticate();
    console.log("DataBase conencted")
    // await db.sync()
} catch (error) {
    console.log(error)
}

app.use(userRoutes)
app.use(categoryRoutes)
app.use(videoRoutes)
app.use(newsRoutes)
app.use(commentRoutes)
app.use(emailRoutes)

app.listen(5000, () => {
    console.log("server is running")
})