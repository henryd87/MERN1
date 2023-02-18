const express = require('express');
const app = express();
const path = require('path');
const PORT = process.env.PORT || 3500
//works as a waterfall

app.use(express.urlencoded({extended:false}));
//.use to apply middleware, for handling url encoded data like form data

//middleware for JSOn
app.use(express.json());

//serve static files
app.use(express.static(path.join(__dirname,'/public')));

//Below, app is now our server and asks for an HTTP request 'get', it looks 
//for the root folder '/' and asks for a function of what to do
app.get('^/$|/index(.html)?',(req,res)=>{
    //or res.sendFile('./views/index.html',{root:__dirname}});
    res.sendFile(path.join(__dirname,'views','index.html'));
})
//npm run dev to start the server
//The ^ means it must begin, $ means must end and (.html)? means optional
app.get('^/$|/new-page(.html)?',(req,res)=>{
    res.sendFile(path.join(__dirname,'views','new-page.html'));
})

app.get('/old-page(.html)?',(req,res)=>{
    res.redirect(301, '/new-page.html'); //302 by default,
    //putting 301 will indicate the the request has been permanently moved.
    //302 is temporarily moved
})

app.get('/hello(.html)?',(req,res,next)=>{
    console.log("attempted to load hello.html");
    //logs to the rterminal
    next();
    //next() moves us to the next argument
},(req,res)=>{
    res.send('hello world!');
})

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
app.get(('/*'),(req,res)=>{
    res.status(404).sendFile(path.join(__dirname,'views','404.html'));
})
//Route handler basically.





app.listen(PORT,()=>console.log(`Server running on port ${PORT}`));
