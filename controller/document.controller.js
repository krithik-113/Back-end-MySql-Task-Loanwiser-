const db = require('../models/db')

exports.getAllDocuments = (req, res) => {
    const { appId } = req.body 
    const sql = "select * from documents where refAppId = ?";
    db.query(sql, [appId], (err,results) => {
        if (err) {
            return console.log(err.message)
        }
        if (results?.length) {
          return  res.json({success:true,documents:results})
        }
        res.json({success:false,message:"No documents available"})
    })
    
}

exports.addDocuments = (req,res) => {
    const { appId, documentName } = req.body 
    const sql = "insert into documents(refAppId,documentName) values(?,?)";
    db.query(sql, [appId, documentName], (err, results) => {
        if (err) {
            return console.log(err.message)
        }
        res.json({success:true,message:"Documents successfully addded...",docId:results.insertId})
    })
}

exports.deleteDocument = (req,res) => {
    const { id } = req.params 
    const sql = "delete from documents where docId = ? ";
    db.query(sql, [id], (err, results) => {
        if (err) {
            return console.log(err.message)
        }
        res.json({success:true,message:"Document deleted successfully..."})
    })
}