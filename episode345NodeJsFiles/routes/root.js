const express = require('express');
const router = express.Router();
const path = require('path');

app.get('^/$|/index(.html)?',(req,res)=>{
    //or res.sendFile('./views/index.html',{root:__dirname}});
    res.sendFile(path.join(__dirname,'..','views','index.html'));
    //the '..' pulls us our of the routes folder and can send us to the views folder
})
//npm run dev to start the server
//The ^ means it must begin, $ means must end and (.html)? means optional
app.get('^/$|/new-page(.html)?',(req,res)=>{
    res.sendFile(path.join(__dirname,'..','views','new-page.html'));
})

app.get('/old-page(.html)?',(req,res)=>{
    res.redirect(301, '/new-page.html'); //302 by default,
    //putting 301 will indicate the the request has been permanently moved.
    //302 is temporarily moved
})

module.exports = root;