const express = require('express')
const connectDB = require('./config/database')
const app = express();
const User = require('./models/user')

const port = 3000;

app.post('/signup', async (req,res)=>{
    try {
        const userObj = {
            firstName: 'Virat',
            lastName: 'Kohli',
            emailId: 'virat@gmail.com',
            password: '123456',
        }
    
        const user = new User(userObj)
    
        await user.save();
    
        res.send('User Added Successfully');
    } catch (error) {
        res.status(400).send("Error while saving "+ error )
    }
})


connectDB().then(()=>{
    console.log('Database Connection Successful...')
    app.listen(port, ()=>{
        console.log(`Server is listing to ${port}`);
    });
}).catch(err=>{
    console.log('Database Ccnnection Unsuccessful..')
})
