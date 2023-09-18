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
  getCart,
  deleteCart,
} = require("../controller/ProductCont");

const router = require("express").Router();

router.get("/", getProducts);
router.post("/upload", multerUploads, uploadPrdct);
router.get("/:catId", getProduct);
router.put("/:catId", putProduct);
router.post("/add/new", multerUploads, postProduct);
router.delete("/:gender", deleteProduct);
router.delete("/", deleteProduct);
router.post("/:userId/cart", postToCart);
router.get("/:userId/cart", getCart);
router.delete("/:userId/cart", deleteCart);

module.exports = router;
