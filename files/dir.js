const fs =require('fs');
//if this directory doesn't exist, make it
if(!fs.existsSync('../new')){
    fs.mkdir('../new',(err)=>{
        if(err) throw err;
        console.log("directory created")
    })
}
//If it does exist, delete it
if(fs.existsSync('../new')){
    fs.rmdir('../new',(err)=>{
        if(err) throw err;
        console.log("directory deleted")
    })
}
