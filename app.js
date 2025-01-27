const express = require("express");
const cors = require('cors');
const connectCloudinary = require("./middleware/cloudinary");

const app = express();

app.use(express.json());
app.use(cors());

connectCloudinary()

app.use('/auth', require('./routes/user.route'))
app.use('/applicant', require('./routes/applicant.route'))
app.use('/document', require('./routes/document.route'))
app.use('/image-uploader',require('./routes/imageUploader.route'))

app.listen(3000, () => {
  console.log(`Server is running on port : 3000`);
});
