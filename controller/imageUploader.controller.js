const db = require('../models/db')
const cloudinary = require('cloudinary')

exports.getAllImagesData = async(req, res) => {
    const { docId } = req.body
    const sql = `select * from imageSaver where docId = ? `;
    db.query(sql, [docId], (err, results) => {
        if (err) {
            return console.log(err.message)
        }
        if (results?.length) {
            return res.json({success:true,message:"Image Uploaded data to docId",imagesUploaded:results})
        }
        return res.json({success:false,message:"No images available to this docId"})
    })
}

exports.StatusChangeForAllImages = (req, res) => {
    const { docId } = req.body 
    const sql = `update imageSaver set status = ? where docId = ?`;
    db.query(sql, ['Completed', docId], (err, results) => {
        if (err) {
            return console.log(err.message)
        }
        res.json({success:true,message:"Status Changed Successfully..."})
    })
}


exports.addImage = async (req, res) => {
    const {appId,docId,status } = req.body
    const sql = `insert into imageSaver(appId,docId,status,size,imageName,imageURL) values(?,?,?,?,?,?)`;
    const imageName = req.files.image[0].originalname;
    let size = req.files.image[0].size / 1024;
    size = size.toFixed(3)
    try {
        let imageUrl = await Promise.all(req.files.image.map(async (item) => {
            let result = await cloudinary.uploader.upload(item.path, { resource_type: "image" })
            return result.secure_url
        }))
        db.query(
          sql,
          [appId, docId, status, size, imageName, imageUrl.join("")],
          (err, results) => {
            if (err) {
             return console.log(err.message);
            }
            res.json({
              success: true,
              message: "Image uploaded successfully",
              imageId: results.insertId,
            });
          }
        );
    } catch (err) {
        console.log(err.message)
    }
    
}

exports.deleteImage = (req, res) => {
  const { id } = req.params;
  const sql = "delete from imageSaver where imageId = ? ";
  db.query(sql, [id], (err, results) => {
    if (err) {
      return console.log(err.message);
    }
    res.json({ success: true, message: "Image deleted successfully..." });
  });
};