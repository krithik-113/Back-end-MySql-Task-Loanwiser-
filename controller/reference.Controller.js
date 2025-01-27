
const updateUser = (req, res) => {
    const updateUser = { name: req.body.name, email: req.body.email };
    let sql = 'update users set ? where id = ?'
    db.query(sql, [updateUser, req.params.id], (err, results) => {
        if (err) throw err
        res.send('User Updated...')
    })
};
