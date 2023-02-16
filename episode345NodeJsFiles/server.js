const http = require('http');
const path = require('path');
const fs = require('fs');
const fsPromises = require('fs').promises
const logEvents = require('./logEvents')

const EventEmitter = require('events');
class Emitter extends EventEmitter{}

const myEmitter = new Emitter();
const PORT = process.env.PORT || 3500
const serveFile=async (filePath,contentTypr,response)=>{
    try{
        const data = await fsPromises.readFile(filePath,'utf8');
        response.writeHead(200,{'Content-Type':contentTypr});
        response.end(data);
    }catch(err){
        console.log(err);
        response.statusCode=500;
        response.end()
    }
}
const server =http.createServer((req,res)=>{
    console.log(req.url,req.method);
    const extension = path.extname(req.url);
    let contentType;
    switch (extension) {
        case '.css':
            contentType = 'text/css';
            //if the requestfor the url is not text/css, we break and
            //move on.
            break;
        case '.js':
            contentType = 'text/javascript';
            break;
        case '.json':
            contentType = 'application/json';
            break;
        case '.jpg':
            contentType = 'image/jpeg';
            break;
        case '.png':
            contentType = 'image/png';
            break;
        case '.txt':
            contentType = 'text/plain';
            break;
        default:
            contentType = 'text/html';
    }
    let filePath =
    //if this is true
        contentType === 'text/html' && req.url === '/'
        //this will be set
            ? path.join(__dirname, '../views', './index.html')
            //if false, this below will be set.
            : contentType === 'text/html' && req.url.slice(-1) === '/'
            //This req.url.slice(-1) means the last character is /, meaning
            //it could be a directory.
                ? path.join(__dirname, '../views', req.url, './index.html')
                : contentType === 'text/html'
                    ? path.join(__dirname, '../views', req.url)
                    : path.join(__dirname, req.url);

    //makes .html extension not required in the browser
    if (!extension && req.url.slice(-1) !== '/') filePath += '.html';
    //!extension can mean there's no .css or .json, and the !==
    //'/' means its not a diretcory so its html. html is not in the swicth
    
    //Does this file exist? Sets true or false
    const fileExists = fs.existsSync(filePath);
    if(fileExists){
        //serve the file
        serveFile(filePath,contentType,res)
    }else{
        //server 404 or 301 (redirect)
        switch(path.parse(filePath).base){
            case 'old-page.html':
                res.writeHead(301,{'Location':'/new-page.html'});
                res.end();
                break;
            case 'www-page.html':
                res.writeHead(301,{'Location':'/'})
                res.end();
                break;
            default:
                //server a 404
                serveFile(path.join('../episode345NodeJsFiles','../views','./404.html'),'text/html',res)
        }
    }

});
server.listen(PORT,()=>console.log(`Server running on port ${PORT}`));

/*myEmitter.on('log',(msg)=> logEvents(msg));

    myEmitter.emit('log','log event emitted!');
*/

//npm run dev to start nodemon and application. !!
//Control C to exit the node area