const auth = require("../models/Userauth");
const User = require("../models/Users");
const router = require("express").Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

//////  ADMINE AUTHENTICATION🔏  //////////
router.post("/", async (req, res) => {
  try {
    const user = await User.findOne({ username: req.body.username });
    !user && res.status(401).send("wrong credentail");
    const accessToken = jwt.sign(
      { username: req.body.username },

      process.env.JWT_SECRET_KEY,
      { expiresIn: "1800s" }
    );
    const { password, ...ohters } = user._doc;
    res.json({ ...ohters, accessToken });
  } catch (err) {
    res.status(500).send(err);
  }
});

module.exports = router;
