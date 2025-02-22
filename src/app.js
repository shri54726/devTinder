const express = require('express')

const app = express();

const port = 3000;

const { userAuth, adminAuth } = require('./middleware/auth')

// app.get('/user',(req, res)=>{
//     res.send({name: "Shrikant", email: "shri@123.com"})
// })

// app.post('/user',(req, res)=>{
//     res.send("Data saved successfully")
// })

// app.delete('/user',(req, res)=>{
//     res.send("Data deleted successfully")
// })

// app.use('/',(req, res)=>{
//     res.send('Hellow from dashboard');
// });

// app.use('/',(req, res,next)=>{
//     console.log('Hello from dashboard');
//     next();
// })

// app.get('/user',(req, res, next)=>{
//         console.log('Hello from user route1')
//         next();
//     },
//     (req,res)=>{
//         res.send({name: "Shrikant", email: "shri@123.com"})
//     },
//     (req,res)=>{
//         res.send({name: "Shrikant", email: "shri@123.com"})
//     }
// );



// app.use('/admin', adminAuth);

app.use('/',(err, req, res, next)=>{
    if(err){
        res.status(500).send('Something Went Wrong')
    }
})

app.get('/admin/getAdminData',(req, res)=>{
    try {
        throw new Error("abovs")
    } catch (error) {
        res.status(500).send('went wrong')
    }
})

app.get('/user/getUserData',(req, res)=>{
    res.send('All user data sent');
})

app.post('/user/login',(err, req,res, next)=>{
    // try {
        // res.send('Login Successfull')
        throw new Error("abovs")
    // } catch (err) {
    //     res.status(500).send('Login Unsfccessful')
    // }
})
app.use('/',(err, req, res, next)=>{
    if(err){
        res.status(500).send('Something Went Wrong')
    }
})

app.delete('/admin/deleteData',(req,res)=>{
    res.send('Data deleted')
})

app.listen(port, ()=>{
    console.log(`Server is listing to ${port}`);
});