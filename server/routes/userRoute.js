import  express  from "express";
import { deleteUser, getAllUsers, logInUser, logOutUser, registerUser, updateProfile, updateUser } from "../controllers/userController.js";
import { verifyToken } from "../middleware/VerifyToken.js";
import { refreshTokenController } from "../controllers/refreshTokenController.js";


const router = express.Router()

router.get("/token",refreshTokenController)
router.get("/api/users",verifyToken,getAllUsers)
router.post("/api/users/register",registerUser)
router.post("/api/users/login",logInUser)
router.delete("/api/users/logOut",verifyToken,logOutUser)
router.delete("/api/users/:id",verifyToken,deleteUser)
router.put("/api/users/:id",verifyToken,updateUser)
router.put("/api/users/profile/:id",verifyToken,updateProfile)

export default router