const express = require('express')

const app = express();

const port = 3000;

app.use('/',(req, res)=>{
    res.send('Hellow from dashboard');
});

app.use('/test',(req, res)=>{
    res.send('Hellow World');
});

app.listen(port, ()=>{
    console.log(`Server is listing to ${port}`);
});