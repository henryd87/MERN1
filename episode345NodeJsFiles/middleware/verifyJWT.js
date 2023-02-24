const jwt=require('jsonwebtoken');
require('dotenv').config();
const verifyJWT = (req,res,next) =>{
    const authHeader = req.headers['authorization'];
    //req.headers with predfeined headers use brackes
    //This is to check the headers of current requests
    if(!authHeader) return res.sendStatus(401);
    console.log(authHeader); //Bearer token
    const token = authHeader.split(' ')[1];
    //get token at the index 1 spot.
    jwt.verify(
        token,
        process.env.ACCESS_TOKE_SECRET,
        (err, decoded) =>{
            if (err) return res.sendStatus(403); //invalid, 403 is forbidden
            req.user = decoded.username;
            next();
        }
    );
}
module.exports = verifyJWT