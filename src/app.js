const express = require('express')
const connectDB = require('./config/database')
const app = express();
const User = require('./models/user')
app.use(express.json())

const port = 3000;

app.post('/signup', async (req,res)=>{
    try {
        const userObj = req.body;

        const user = new User(userObj);
    
        await user.save();
    
        res.send('User Added Successfully');
    } catch (error) {
        res.status(400).send("Error while saving "+ error )
    }
});

app.get('/getUserByEmail', async (req, res)=>{
    const userEmail = req.query.email;
    try {
        const user = await User.findOne({emailId: userEmail}).exec();
        if(!user){
            res.status(404).send('user not found')
        }else{
            res.send(user)
        }
        // const user = await User.find({emailId: userEmail});
        // if(user.length === 0){
        //     res.status(404).send('user not found')
        // }else{
        //     res.send(user)
        // }
    } catch (error) {
        res.status(400).send("Error while getting user data "+ error )
    }
});


app.get('/getAllUser', async (req, res)=>{
    try {
        const user = await User.find({});
        if(user.length === 0){
            res.status(404).send('users not found')
        }else{
            res.send(user)
        }
    } catch (error) {
        res.status(400).send("Error while getting user data "+ error )
    }
});

app.delete('/deleteUserById', async (req, res)=>{
    const userId = req.body.userId;
    try {
        const user = await User.findByIdAndDelete({_id: userId});
        res.send('user deleted')
    } catch (error) {
        res.status(400).send("user not deleted")
    }

});


app.patch('/updateUserById', async (req, res)=>{
    const userId = req.query.userId;
    const data = req.body;
    try {
        const AllowedKeys = ['userId','gender','skills','photoUrl']

        const isUpdateAllowed = Object.keys(data).every((k)=>AllowedKeys.includes(k));

        if(!isUpdateAllowed){
            throw new Error('Update is not allowed');
        }

        if(data.skills.length>10){
            throw new Error('Skills should not exceed 10');
        }

        const user = await User.findByIdAndUpdate({_id:userId}, data, {returnDocument: 'after', runValidators: true});
        res.send(user)
    } catch (error) {
        res.status(400).send("user not updated " + error)
    }

});


connectDB().then(()=>{
    console.log('Database Connection Successful...')
    app.listen(port, ()=>{
        console.log(`Server is listing to ${port}`);
    });
}).catch(err=>{
    console.log('Database Ccnnection Unsuccessful..')
})
