const usersDB = {
    users: require('../model/users.json'),
    setUsers: function (data) {this.users = data}
}

const bcrypt = require('bcrypt');

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
        
        res.json({'success':`Users ${user} is logged in`});
    } else {
        res.sendStatus(401);
    }
}
module.exports = {handleLogin};