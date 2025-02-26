
exports.post = async function(req, res){
    res.cookie('token', null, {
        expires: new Date(Date.now())
    })
    .send('Logout Successful!')
}