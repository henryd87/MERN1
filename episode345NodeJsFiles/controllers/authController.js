const usersDB = {
    users: require('../model/users.json'),
    setUsers: function (data) {this.users = data}
}

const bcrypt = require('bcrypt');

const fsPromises = require('fs').promises;
const path = require('path');

const handleLogin = async (req,res) =>{
    const {user, pwd}=req.body;
    if(!user || !pwd) return res.staus(400).json({'message':'Username and password are required'});
    const foundUser = usersDB.users.find(person=>person.username===user);
    if(!foundUser) return res.sendStatus(401); //unauthorized 401

    //evaluate passwords for found user
    const match = await bcrypt.compare(pwd,foundUser.password);
    if(match){
        //create JWT token to send to protect routes
        //JWT tokens can be used to share data safely between 2 party websites.
        const accessToken = jwt.sign(
            {"username":foundUser.username},
            process.env.ACCESS_TOKEN_SECRET,
            {expiresIn:'30s'}
        );
        const refreshToken = jwt.sign(
            {"username":foundUser.username},
            process.env.REFRESH_TOKEN_SECRET,
            {expiresIn:'1d'}
        );
        //Saving refreshToken with current user
        const otherUsers = usersDB.users.filter(
            person =>person.username !==  foundUser.username);
        const currentUser= {...foundUser,refreshToken};
        usersDB.setUsers([...otherUsers,currentUser]);
        await fsPromises.writeFile(
            path.join(__dirname,'..','model','users.json'),
            JSON.stringify(usersDB.users)
        )
        //sending a cookie as http only is not vulnerbale to javascript hacking
        //sending refreshToken in a cookie that is http only
        res.cookie('jwt',refreshToken,{httpOnly:true, maxAge:24*60*60*1000});
        //max age is one day
        //sending accessToken as json
        res.json({accessToken });
    } else {
        res.sendStatus(401);
    }
}
module.exports = {handleLogin};