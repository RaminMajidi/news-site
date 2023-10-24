import express from "express";
import { deleteUser, getAllUsers, loginUser, logOutUser, registerUser, updateProfile, updateUser } from "../controllers/user.js";
import { verifyToken } from "../middleware/VerifyToken.js";
import { refreshToken } from "../controllers/refreshToken.js";


const router = express.Router()

router.get("/token", refreshToken)
router.post("/api/users/login", loginUser)
router.post("/api/users/register", verifyToken, registerUser)
router.delete("/api/users/logOut", verifyToken, logOutUser)
router.get("/api/users", verifyToken, getAllUsers)
router.delete("/api/users/:id", verifyToken, deleteUser)
router.put("/api/users/:id", verifyToken, updateUser)
router.put("/api/users/profile/:id", verifyToken, updateProfile)

export default router