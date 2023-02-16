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
const logEvents = async(message)=>{
    const dateTime = `${format(new Date(), 'yyyyMMdd\tHH:mm:ss')}`;
    const logItem =`${dateTime}\t${uuid()}\t${message}\n`;
    console.log(logItem);
    try{
        if(!fs.existsSync(path.join('../episode3NodeJsFiles','logs'))){
            await fsPromises.mkdir(path.join('../episode3NodeJsFiles','logs'));
        }
        await fsPromises.appendFile(path.join('../episode3NodeJsFiles','logs','eventLog.txt'),logItem);
    }catch(err){
        console.log(err);
    }
}

module.exports = logEvents;