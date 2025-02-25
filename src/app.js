const express = require('express')
const connectDB = require('./config/database')
const User = require('./models/user')
const { validateSignUp } = require('./utils/validations')
const bcrypt = require('bcrypt')
const validator = require('validator');
const cookieParser = require('cookie-parser')
const { userAuth } = require('./middleware/auth')
const jwt = require('jsonwebtoken');


const app = express();
app.use(express.json())
app.use(cookieParser());

const port = 3000;

app.post('/signup', async (req,res)=>{
    try {
        // Validate Data
        validateSignUp(req.body);

        // Encrypt Password
        const {firstName, lastName, emailId, password} = req.body;

        const hashPassword = await bcrypt.hash(password, 10);

        const user = new User({
            firstName, lastName, emailId, password: hashPassword
        });
    
        await user.save();
    
        res.send('User Added Successfully');
    } catch (error) {
        res.status(400).send("Error while saving "+ error )
    }
});


app.post('/login', async (req, res)=>{
    try {
        const {emailId, password} = req.body;
        if(!validator.isEmail(emailId)){
            throw new Error('Invalid credentials');
        }
        const isUserAvailable = await User.findOne({emailId:emailId});

        if(!isUserAvailable){
            throw new Error('Invalid credentials');
        }

        const isValidPassword = await isUserAvailable.validatePassword(password)
        if(!isValidPassword){
            throw new Error('Invalid credentials');
        }  

        const token = await isUserAvailable.getJWT();

        res.cookie('token', token,{ expires: new Date(Date.now() + 1 + 900000)})
        res.send("You have been logged in...");

    } catch (error) {
        res.status(400).send('somthing went wrong: '+error);
    }
});

app.get('/getProfile', userAuth, async(req, res)=>{
   try {
    const user = req.user;

    res.send(user)
   } catch (error) {
        res.status(400).send('somthing went wrong: '+error);
   }
})

app.post('/getConnectionRequest', userAuth, async (req, res)=>{
    const user = req.user;
    res.send(user.firstName+' sent a coneection request!');
})


connectDB().then(()=>{
    console.log('Database Connection Successful...')
    app.listen(port, ()=>{
        console.log(`Server is listing to ${port}`);
    });
}).catch(err=>{
    console.log('Database Ccnnection Unsuccessful..')
})
