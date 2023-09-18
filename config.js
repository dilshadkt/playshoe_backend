// const cloudinary = require("cloudinary").v2;
const { uploader, config } = require("cloudinary");

const cloudinaryConfig = (req, res, next) => {
  config({
    cloud_name: "dob1zdjnp",
    api_key: "453829139621875",
    api_secret: "8xrnvBAt6o8WiYRH51dblOAoCHQ",
  });

  next();
};

module.exports = { cloudinaryConfig, uploader };
