const db = require("../models/db");

exports.getAllApplicants = (req, res) => {
    const { userId } = req.body;
    const sql = "select * from applicants where userId = ?";
    db.query(sql,[userId], (err, results) => {
        if (err) {
            return console.log(err.message)
        }
        if (results?.length) {
          return  res.json({ success: true, applicants: results });
        }
        res.json({
          success: false,
          message: "No Applicants available..."
        });
    })
}

exports.addApplicant = (req,res) => {
    const { applicant, userId } = req.body;
    const sql = "insert into applicants(userId,applicantName) values(?,?)";
    db.query(sql, [userId, applicant], (err,results) => {
        if (err) {
          return console.log(err.message)
        }
        res.json({success:true,message:"Applicant added successfully...",id:results.insertId})
    })
}

exports.deleteApplicant = (req, res) => {
    const { id } = req.params
    const sql = "delete from applicants where appId = ?";
    db.query(sql, [id], (err, results) => {
        if (err) {
            return console.log(err.message)
        }
        if (id) {
             const innersql = "delete from documents where refAppId = ?";
             db.query(innersql, [id], (err, results) => {
               if (err) {
                 return console.log(err.message);
               }
               const deepinnersql = "delete from imageSaver where appId = ?";
               db.query(deepinnersql, [id], (err, results) => {
                 if (err) {
                   return console.log(err.message)
                 }
                 return res.json({success:true,message:"Applicant Deleted along with Docxs & Images included with apolicant"})
               })
             });
        }
        
    })
}