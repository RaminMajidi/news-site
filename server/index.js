import express from "express";
import db from "./config/DataBase.js";
import userRoutes from "./routes/userRoute.js";
import categoryRoutes from "./routes/categoryRoute.js";
import videoRoutes from "./routes/videoRoute.js";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import fileUpload from "express-fileupload";



dotenv.config();
const app = express();
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

app.listen(5000, () => {
    console.log("server is running")
})