const express = require('express');
const router = express.Router();
const path = require('path');

router.get('^/$|/index(.html)?',(req,res)=>{
    //or res.sendFile('./views/index.html',{root:__dirname}});
    res.sendFile(path.join(__dirname,'..','views','index.html'));
    //the '..' pulls us our of the routes folder and can send us to the views folder
})

module.exports = router;
//e