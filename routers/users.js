const router = require("express").Router();
const { VerifyToken } = require("../middlewares/VerifyToken");
const {
  getOrderDetails,
  getUser,
  getUsers,
  getProductStats,
  postRegisterUser,
  postLogin,
  getSpecificUser,
  CurrentUser,
} = require("../controller/userController");
router.get("/me", VerifyToken, CurrentUser);
router.post("/register", postRegisterUser);
router.post("/login", postLogin);
router.get("/", getUsers);
router.get("/user/:id", getUser);
router.get("/stats", getProductStats);
router.get("/orders", getOrderDetails);
router.get("/:userId", getSpecificUser);

module.exports = router;
