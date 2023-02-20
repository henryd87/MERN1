const express = require('express');
const app = express();
const path = require('path');
const cors = require('cors');
const corsOptions = require('./config/corsOptions')
//cors allows servers to indicate origins, allows checkpoints for securing data.
const {logger} = require('./middleware/logEvents');
//errorHandler doesn't need curly braces because it was the only file
const errorHandler = require('./middleware/errorHandler');
const PORT = process.env.PORT || 3500
//works as a waterfall

//custom middleware logger
app.use(logger);

app.use(cors(corsOptions));

app.use(express.urlencoded({extended:false}));
//.use to apply middleware, for handling url encoded data like form data

//middleware for JSOn
app.use(express.json());

//serve static files, also allows for css to enter from the public folder
app.use('/',express.static(path.join(__dirname,'/public')));
app.use('/subdir',express.static(path.join(__dirname,'/public')));

app.use('/',require('./routes/root'));

app.use('/employees',require('./routes/api/employees'));

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
