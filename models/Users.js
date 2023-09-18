const mongoose = require("mongoose");
const productSchema = new mongoose.Schema({
  products: {
    type: Array,
  },
  date: {
    type: Date,
  },
  order_id: {
    type: String,
  },
  payment_id: {
    type: String,
  },
});
const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  cart: { type: Array },
  wishlist: {
    type: Array,
  },
  orders: {
    type: Array,
  },
});

module.exports = mongoose.model("User", userSchema);
