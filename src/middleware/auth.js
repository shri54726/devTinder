const adminAuth  = (req, res, next)=>{
        const token = 'abc';
        if(token == 'abc'){
            next();
        }else{
            res.status(401).send('Admin Not Authorized')
        }
    }

    const userAuth  = (req, res, next)=>{
        const token = 'abc';
        if(token == 'abc'){
            next();
        }else{
            res.status(401).send('User Not Authorized')
        }
    }

module.exports = { adminAuth, userAuth };