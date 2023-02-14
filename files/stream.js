//If we have large files, it can be good to take data in small bits.
//More easy on the application
const fs = require('fs');

const rs = fs.createReadStream('../files/lorem.txt',{encoding:'utf8'});

const ws = fs.createWriteStream('../files/new-lorem.txt');

/*rs.on('data',(dataChunk)=>{
    ws.write(dataChunk);
})

OR */
rs.pipe(ws);
//Basicaly just writes the data from lorem.txt to new-lorem