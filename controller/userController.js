const User = require("../models/Users");
const Product = require("../models/Products");
const CryptoJS = require("crypto-js");
const jwt = require("jsonwebtoken");
const { authSchema, registerSchema } = require("../helpers/validation_schema");
////////// GET ALL USERS  ////////////

const getUsers = async (req, res, next) => {
  try {
    const users = await User.find();
    res.status(200).json({
      status: "success",
      message: "Successfully fetched user datas.",
      data: users,
    });
  } catch (err) {
    next(err);
  }
};

//////////// GET USER  /////////////////
const getUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);
    res.status(200).json({
      status: "success",
      message: "Successfully fetched user data.",
      data: user,
    });
  } catch (err) {
    next(err);
  }
};
///////////  REGISTER USER  //////////////////
const postRegisterUser = async (req, res, next) => {
  // console.log(req.body);
  const newUser = new User({
    username: req.body.username,
    email: req.body.email,
    password: CryptoJS.AES.encrypt(
      req.body.password,
      "Secret Passphrase"
    ).toString(),
  });
  try {
    const result = await registerSchema.validateAsync(req.body);
    const savedUser = await newUser.save();
    res.status(201).json(savedUser);
  } catch (err) {
    if (err.isJoi === true) err.statusCode = 422;
    next(err);
  }
};

/////////  LOGIN   //////////////
const postLogin = async (req, res, next) => {
  try {
    const result = await authSchema.validateAsync(req.body);
    console.log(result);
    const user = await User.findOne({ username: req.body.username });
    console.log(user);
    !user && res.status(500).json("Wrong credential");
    const hashedPassword = CryptoJS.AES.decrypt(
      user.password,
      "Secret Passphrase"
    );
    const Orgpassword = hashedPassword.toString(CryptoJS.enc.Utf8);
    Orgpassword !== req.body.password &&
      res.status(500).json("Wrong credential");
    const accessToken = jwt.sign(
      { username: user.username, id: user._id },
      process.env.JWT_SECRET_KEY
    );
    const { password, ...others } = user._doc;
    res.status(200).json({ ...others, accessToken });
  } catch (err) {
    if (err.isJoi === true) err.statusCode = 422;
    next(err);
  }
};

///////////  PRODUCT STATS🧾🧾  /////////////
const getProductStats = async (req, res, next) => {
  try {
    //TODO: impliment ACID here
    //TODO: impliment JOI
    //TODO: impliment TRY CATCH
    const TotalProduct = await Product.find().count();
    const TotalMenProduct = await Product.find({ category: "men" }).count();
    const TotalWomenProduct = await Product.find({ category: "women" }).count();

    res.status(200).json({
      totalProduct: TotalProduct,
      totalMenProduct: TotalMenProduct,
      totalWomenProduct: TotalWomenProduct,
    });
  } catch (err) {
    next(err);
  }
};

/////////////  PRODUCT ORDER DETAILS📘📘  ////////////
const getOrderDetails = async (req, res, next) => {
  try {
  } catch (err) {
    next();
  }
};

////  GET SPECIFIC USER  //////
const getSpecificUser = async (req, res, next) => {
  try {
    const userId = req.params.userId;
    const user = await User.findById(userId);
    const result = user.cart.length;

    res.status(200).json(result);
  } catch (err) {
    next(err);
  }
};

module.exports = {
  getOrderDetails,
  getUser,
  getUsers,
  getProductStats,
  postRegisterUser,
  postLogin,
  getSpecificUser,
};
