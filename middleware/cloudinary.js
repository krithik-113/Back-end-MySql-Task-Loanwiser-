const {v2 : cloudinary} = require('cloudinary')

const connectCloudinary = () => {
    cloudinary.config({
      cloud_name: "dxvracvvl",
      api_key: 942538474317598,
      api_secret: "8Z13kwwtasG2gj6c5Y_rMslLgfs",
    });
}

module.exports = connectCloudinary