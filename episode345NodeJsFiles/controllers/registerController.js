const usersDB = {
    users: require('../modles/users.json'),
    setUsers: function (data) {this.users = data}
}
const fsPromises = require('fs').promises;
const path = require('path');
const bcrypt = require('bcrypt');

const handleNewUser = async (req,res) =>{
    const {user, pwd}=req.body;
    if(!user || !pwd) return res.staus(400).json({'message':'Username and password are required'});
    //400 means its a bad request
    //chekc for duplicate database names;
    const duplicate = usersDB.users.find(person=>person.username === user);
    //This checks the users dtaabase for all users, find sthe person with the same
    //username as our user.
}