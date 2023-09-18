const Product = require("../models/Products");
const { cloudinaryConfig, uploader } = require("../config");
const { dataUri } = require("../middlewares/Multer");
const Users = require("../models/Users");

///////////  GET ALL PRODUCT  ///////////////
const getProducts = async (req, res, next) => {
  try {
    if (req.query.category) {
      let filter;
      const prdcts =
        req.query.category === "all"
          ? (filter = await Product.find())
          : await Product.find({ category: req.query.category });
      res.status(200).json({
        status: "success",
        message: "Successfully fetched products detail.",
        data: prdcts,
      });
    } else {
      const products = await Product.find();
      res.status(200).json({
        status: "success",
        message: "Successfully fetched products detail.",
        data: products,
      });
    }
  } catch (err) {
    next(err);
  }
};

////// GET A SPECIFIC PRODUCT  //////////////

const getProduct = async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.catId);
    res.status(200).json({
      status: "success",
      message: "Successfully fetched product details.",
      data: product,
    });
  } catch (err) {
    next(err);
  }
};

//////// GET CATEGORIZES PRODUCT  //////////

const getCategorizedProduct = async (req, res, next) => {
  try {
    const products = await Product.find({ category: `${req.params.gender}` });
    res.status(200).json(products);
  } catch (err) {
    next(err);
  }
};
/////////  UPDATE PRODUCT ///////////////
const putProduct = async (req, res, next) => {
  try {
    const UpdatedProduct = await Product.findByIdAndUpdate(
      req.params.catId,
      {
        $set: req.body,
      },
      { new: true }
    );
    res.json({
      status: "success",
      message: "Successfully updated a product.",
    });
  } catch (err) {
    next(err);
  }
};

//////////// ADD NEW PRODUCT  //////////////////////
const postProduct = async (req, res, next) => {
  if (req.file) {
    const file = dataUri(req).content;
    const result = await uploader.upload(file);
    const newProduct = new Product({
      title: req.body.title,
      description: req.body.description,
      price: req.body.price,
      image: result.url,
      category: req.body.category,
    });
    console.log(result.url);
    try {
      const savedProduct = await newProduct.save();
      res.status(201).json({
        status: "success",
        message: "Successfully created a product.",
      });
    } catch (err) {
      next(err);
    }
  }
};

////////////  DELETE A PRODUCT  /////////

const deleteProduct = async (req, res, next) => {
  try {
    const removedItem = await Product.findByIdAndDelete(req.query.id);
    res.json({
      status: "success",
      message: "Successfully deleted a product.",
    });
  } catch (err) {
    next(err);
  }
};
////////////  POST PRODUCT TO THE CART 🛒🛒🛒  ///////////
const postToCart = async (req, res, next) => {
  const userId = req.params.userId;
  const productId = req.body.productId;
  const user = await Users.findById(userId);
  const dublicated = user.cart.filter(
    (item) => item._id.toString() == productId.toString()
  );

  try {
    if (dublicated == "") {
      const product = await Product.findById(productId);
      const result = await Users.findByIdAndUpdate(
        userId,
        { $push: { cart: product } },
        { new: true }
      );

      await result.save();
      res.status(200).json(result);
    }
  } catch (err) {
    next(err);
  }
};
///// GET PRODUCT OF SPECIFIC USER ///////////
const getCart = async (req, res, next) => {
  try {
    const user = req.params.userId;
    const product = await Users.findById(user);
    res.status(200).json(product.cart);
  } catch (err) {
    next(err);
  }
};

////// REMOVE PRODUCT FROM CART ///////////
const deleteCart = async (req, res, next) => {
  try {
    const userId = req.params.userId;
    const productId = req.query.productId;

    const user = await Users.findById(userId);

    const indexToRemove = user.cart.findIndex(
      (item) => item._id.toString() === productId
    );
    if (indexToRemove === -1) {
      return { error: "Cart item not found in the user's cart" };
    }
    user.cart.splice(indexToRemove, 1);

    await user.save();
    res.status(200).json(user);
  } catch (err) {
    next(err);
  }
};
const uploadPrdct = async (req, res) => {
  if (req.file) {
    const file = dataUri(req).content;
    const result = await uploader.upload(file);
    const newProduct = new Product({
      title: req.body.title,
      description: req.body.description,
      price: req.body.price,
      image: result.url,
      category: req.body.category,
    });
    console.log(result.url);
    try {
      const savedProduct = await newProduct.save();
      res.status(201).json({
        status: "success",
        message: "Successfully created a product.",
      });
    } catch (err) {
      next(err);
    }
  }
  // if (req.file) {
  //   const file = dataUri(req).content;
  //   return uploader
  //     .upload(file)
  //     .then((result) => {
  //       const image = result.url;
  //       console.log(image);
  //       return res.status(200).json({
  //         messge: "Your image has been uploded successfully to cloudinary",
  //         data: { image },
  //       });
  //     })
  //     .catch((err) =>
  //       res.status(400).json({
  //         messge: "someting went wrong while processing your request",
  //         data: {
  //           err,
  //         },
  //       })
  //     );
  // }
};

module.exports = {
  postProduct,
  getProduct,
  getProducts,
  deleteProduct,
  putProduct,
  getCategorizedProduct,
  uploadPrdct,
  postToCart,
  getCart,
  deleteCart,
};
