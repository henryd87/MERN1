//npm run dev to start nodemon and our project
//npm rm nodemon to delete a dependency
//console.log("testing!")
//initialize a project with npm init
//npm init -y

const {format} = require('date-fns');
const {v4:uuid} = require('uuid'); 

//Renamed this file to log Events, now we create index js using fs.



console.log(format(new Date(), 'yyyyMMdd\tHH:mm:ss'));

//npm i nodemon --save-dev to create nodemon as a dependency 

console.log("hello")

//npm i uuid creates unique ids
console.log(uuid());