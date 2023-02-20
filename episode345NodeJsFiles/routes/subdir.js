const express = require('express');
const router = express.Router();
const path = require('path');

router.get('^/$|/index(.html)?',(req,res)=>{
    res.sendFile(path.join(__dirname,'..','views','subdir','index.html'));
    //I'm in the routes folder. I need to go episode345 files, escape out of routes,
    //go to views then subdir folder then to index
})
router.get('/test(.html)?',(req,res)=>{
    res.sendFile(path.join(__dirname,'..','views','subdir','test.html'));
    //I'm in the routes folder. I need to go episode345 files, escape out of routes,
    //go to views then subdir folder then to index
})



module.exports = router;