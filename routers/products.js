const Product = require("../models/Products");
const { multerUploads } = require("../middlewares/Multer");
const upload = require("../middlewares/Multer");
const cloudinary = require("../config");

const {
  getProducts,
  postProduct,
  getProduct,
  deleteProduct,
  putProduct,
  getCategorizedProduct,
  uploadPrdct,
  postToCart,
  getCartItems,
  deleteCartItem,
} = require("../controller/ProductCont");
const { VerifyToken } = require("../middlewares/VerifyToken");

const router = require("express").Router();

router.get("/", getProducts);
router.get("/cart", VerifyToken, getCartItems);
router.post("/cart", VerifyToken, postToCart);
router.delete("/cart", VerifyToken, deleteCartItem);
router.delete("/", deleteProduct);
router.post("/upload", multerUploads, uploadPrdct);
router.get("/:catId", getProduct);
router.put("/:catId", putProduct);
router.post("/add/new", multerUploads, postProduct);
router.delete("/:gender", deleteProduct);

module.exports = router;
