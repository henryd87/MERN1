const fs = require('fs');
const path = require('path');
fs.readFile(path.join('../files','starter.txt'), 'utf8',(err,data)=>{
    if (err) throw err;
    console.log(data);
}) 

fs.writeFile(path.join('../files','reply.txt'), 'Nice to meet you', (err)=>{
    if (err) throw err;
    console.log("Write complete");
    fs.appendFile(path.join('../files','reply.txt'), '\n\nYes it is', (err)=>{
        if (err) throw err;
        console.log("Append complete");
    }) 
    //This can change the name of a file first argument is original, second is new rename.
    fs.rename(path.join('../files','reply.txt'), path.join('../files','new.txt'), (err)=>{
        if (err) throw err;
        console.log("Rename complete");
    }) 
}) 

fs.appendFile(path.join('../files','test.txt'), 'Testing', (err)=>{
    if (err) throw err;
    console.log("Append complete");
}) 
//Will create a file if it doesn't exist (append).


process.on('uncaughtException', err=>{
    console.error(`There was an uncuaght error: ${err}`);
    process.exit(1);
})