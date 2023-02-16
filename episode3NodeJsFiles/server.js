const logEvents = require('./logEvents')
//Common core module below
const EventEmitter = require('events');
class MyEmitter extends EventEmitter{}
//initalized object
const myEmitter = new MyEmitter();
//add listener for log event
//The .on means it can listen
myEmitter.on('log',(msg)=> logEvents(msg));
setTimeout(()=>{
    myEmitter.emit('log','log event emitted!');
}, 2000)

//npm run dev to start nodemon and application.