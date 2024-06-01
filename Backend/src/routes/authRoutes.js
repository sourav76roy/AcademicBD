const express = require("express");
const router = express.Router();

const {
  register,
  login,
  getAllUsers,
  updateUserRole,
  deleteUser,
} = require("../controller/authController");

router.post("/register", register);
router.post("/login", login);
router.get("/all-users", getAllUsers);
router.put("/update-user-role/:userId", updateUserRole);
router.delete("/delete-user/:userId", deleteUser);

module.exports = router;
