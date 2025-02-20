const express = require('express')

const app = express();

const port = 3000;

app.get('/user',(req, res)=>{
    res.send({name: "Shrikant", email: "shri@123.com"})
})

app.post('/user',(req, res)=>{
    res.send("Data saved successfully")
})

app.delete('/user',(req, res)=>{
    res.send("Data deleted successfully")
})

app.use('/',(req, res)=>{
    res.send('Hellow from dashboard');
});



app.listen(port, ()=>{
    console.log(`Server is listing to ${port}`);
});