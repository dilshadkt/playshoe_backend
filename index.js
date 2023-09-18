const mongoose = require("mongoose");
const dotenv = require("dotenv");
const express = require("express");
const app = express();
const cors = require("cors");
dotenv.config();

const authRout = require("./routers/auth");
const adminRout = require("./routers/users");
const productRout = require("./routers/products");
const ErrorHandler = require("./middlewares/ErrorHandler");
const { cloudinaryConfig } = require("./config");

////// mongodb connctiion 🔮🔮🔮//////////////
mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log("connection is good"))
  .catch((err) => console.log(err));
app.use(cors());
app.use(express.json());
app.use("/admine/products", productRout);
app.use("*", cloudinaryConfig);
app.use("/user", adminRout);
app.use("/admine", adminRout);
app.use("/admine/adminLog", authRout);

//// user aspect  🥸🥸 ////////////////

app.use("/users", productRout);
app.use(ErrorHandler);

///// listener 🎧🎧🎧🎧/////////////////////
app.listen(process.env.PORT || 5000, () => {
  console.log("listning on port " + process.env.PORT);
});
