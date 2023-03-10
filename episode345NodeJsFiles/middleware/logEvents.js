//npm run dev to start nodemon and our project
//npm rm nodemon to delete a dependency
//console.log("testing!")
//initialize a project with npm init
//npm init -y
//need npm to download the bottom 2 
const {format} = require('date-fns');
const {v4:uuid} = require('uuid'); 

//Renamed this file to log Events, now we create index js using fs.
const fs = require('fs');
const fsPromises = require('fs').promises;
const path = require('path')
//These 3 are common core
const logEvents = async(message,logName)=>{
    const dateTime = `${format(new Date(), 'yyyyMMdd\tHH:mm:ss')}`;
    const logItem =`${dateTime}\t${uuid()}\t${message}\n`;
    console.log(logItem);
    try{
        if(!fs.existsSync(path.join('../episode345NodeJsFiles','..','logs'))){
            await fsPromises.mkdir(path.join('../episode345NodeJsFiles','..','logs'));
        }
        await fsPromises.appendFile(path.join('../episode345NodeJsFiles','..','logs',logName),logItem);
    }catch(err){
        console.log(err);
    }
}

const logger = (req,res,next)=>{
    logEvents(`${req.method}\t${req.headers.origin}\t${req.url}`,'reqLog.txt');
    console.log(`${req.method} ${req.path}`);
    next();
}

module.exports = {logger, logEvents};