//This whitelist basically tells which servers can access the backend data
const whitelist = ('https://www.google.com','http://127.0.0.1:5500','http://localhost:3500');
const corsOptions = {
    //this allows other websites to be blocked from accessing data
    origin:(origin,callback)=>{
        //!origin means undefined
        if (whitelist.indexOf(origin)!== -1 || !origin){
            callback(null,true);
        } else{
            callback(new Error('Not allowed by cors'))
        }
    },
    optionsSucessStatus:200
}
module.exports = corsOptions;