const db = require("../models/db");
const bcrypt = require('bcrypt')
const { generateToken } = require('../utils/generateToken')

exports.register =  (req, res) => {
  const { name, email, password, passwordConfirm } = req.body;
  const mysql = "select email from users where email = ?";
  db.query(mysql, [email], async(err, results) => {
    if (err) {
      return console.log(err.message);
    }
    if (results?.length) {
      return res.json({ success: false, message: "Email is already in use" });
    } else if (password !== passwordConfirm) {
      return res.json({ success: false, message: "Password doesn't match" });
    }
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)
    const mysqlAdd = "insert into users(name,email,password) values(?,?,?)"
    db.query(mysqlAdd, [name, email, hashedPassword], (err, result) => {
      if (err) {
      return  console.log(err.message)
      }
      res.json({
        success: true,
        message: "Successfully Registered"
      });
    })
    
  });
};

exports.login = (req,res) => {
  const { email, password } = req.body
  const mysql = "select id,password from users where email = ?"
  db.query(mysql, [email], async(err,results) => {
    if (err) {
      return console.log(err.message)
    }
    if (results?.length) {
      const checkingPassword = await bcrypt.compare(password,results[0].password)
      if (checkingPassword) {
        return res.json({success:true,message:"Login Successfully",token:generateToken(results[0].id)})
      }
     return res.json({success:false,message:"Incorrect Password"})
    }
    res.json({success:false,message:"Email is not exists"})
  })
}
