const express = require("express");
const {
    deleteUser,
    getAllUsers,
    loginUser,
    logOutUser,
    registerUser,
    updateProfile,
    updateUser,
    getProfile
} = require("../controllers/user");
const { verifyToken } = require("../middleware/VerifyToken");
const { refreshToken } = require("../controllers/refreshToken");


const router = express.Router()

router.get("/token", refreshToken)
router.post("/api/users/login", loginUser)
router.post("/api/users/register", verifyToken, registerUser)
router.delete("/api/users/logOut", verifyToken, logOutUser)
router.get("/api/users", verifyToken, getAllUsers)
router.delete("/api/users/:id", verifyToken, deleteUser)
router.put("/api/users/:id", verifyToken, updateUser)
router.put("/api/users/profile/:id", verifyToken, updateProfile)
router.get("/api/users/profile", verifyToken, getProfile)

module.exports = router