const {logEvents} = require('./logEvents');
const errorHandler = (err,req,res,next) => {
    logEvents(`${err.name}: ${err.message}`,'errLog.txt');
    console.error(err.stack);
    res.status(500).send(err.message);
    //500 means server ecnountered something unexpected that prevented fulfilling a request
}

module.exports = errorHandler;