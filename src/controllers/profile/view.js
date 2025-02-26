exports.get = async function(req, res){
    try {
     const user = req.user;
 
     res.send(user)
    } catch (error) {
         res.status(400).send('somthing went wrong: '+error);
    }
 }