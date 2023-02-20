const express = require('express');
const app = express();
const path = require('path');
const cors = require('cors');
//cors allows servers to indicate origins, allows checkpoints for securing data.
const {logger} = require('./middleware/logEvents');
//errorHandler doesn't need curly braces because it was the only file
const errorHandler = require('./middleware/errorHandler');
const PORT = process.env.PORT || 3500
//works as a waterfall

//custom middleware logger
app.use(logger);

//This whitelist basically tells which servers can access the backend data
const whitelist = ('https://www.google.com','http://127.0.0.1:5500','http://localhost:3500');
const corsOptions = {
    //this allows other websites to be blocked from accessing data
    origin:(origin,callback)=>{
        //!origin means undefined
        if (whitelist.indexOf(origin)!== -1 || !origin){
            callback(null,true);
        } else{
            callback(new Error('Not allowed by cors'))
        }
    },
    optionsSucessStatus:200
}
app.use(cors(corsOptions));

app.use(express.urlencoded({extended:false}));
//.use to apply middleware, for handling url encoded data like form data

//middleware for JSOn
app.use(express.json());

//serve static files, also allows for css to enter from the public folder
app.use('/',express.static(path.join(__dirname,'/public')));
app.use('/subdir',express.static(path.join(__dirname,'/public')));

app.use('/',require('./routes/root'));
app.use('/subdir',require('./routes/subdir'));
//for any requests going to the subdir folder, will be transferred 
//to the routes folder's version of subdirectory where routes are stored.


//___________________________
//This is a good example of route handling. These are all functions
//And we call these functions in the array under a madeup html '/chain'
//get request and the res is console.log and the next for next()
const one = (req,res,next) =>{
    console.log("one");
    next();
}
const two = (req,res,next) =>{
    console.log("two");
    next();
}
const three = (req,res) =>{
    console.log("three");
    res.send('Finished')
}
app.get('/chain(.html)?', [one, two, three]);
//__________________________

// /* means select any thing /anything will defualt to a route
//We have a 404.html but this is saying that any page with /anything
//other than what we have will send to the 404.html saying the page isn't found
app.all(('*'),(req,res)=>{
    res.status(404);
    if (req.accepts('html')){
        res.sendFile(path.join(__dirname,'views','404.html'));
    }
    else if (req.accepts('json')){
        res.json({error:"404"});
    }
})
//Route handler basically.

app.use(errorHandler);





app.listen(PORT,()=>console.log(`Server running on port ${PORT}`));
