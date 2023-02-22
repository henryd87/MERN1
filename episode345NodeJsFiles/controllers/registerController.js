const usersDB = {
    users: require('../model/users.json'),
    setUsers: function (data) {this.users = data}
}
const fsPromises = require('fs').promises;
const path = require('path');
const bcrypt = require('bcrypt');
const { restart } = require('nodemon');

const handleNewUser = async (req,res) =>{
    const {user, pwd}=req.body;
    if(!user || !pwd) return res.staus(400).json({'message':'Username and password are required'});
    //400 means its a bad request
    //chekc for duplicate database names;
    const duplicate = usersDB.users.find(person=>person.username === user);
    //This checks the users dtaabase for all users, find sthe person with the same
    //username as our user.
    if(duplicate) return res.sendStatus(409); //409 is a conflict
    try {
        //encrypt the password
        const hashedPassword = await bcrypt.hash(pwd, 10);
        //store the new user
        const newUser = {"username":user,"password":hashedPassword};
        usersDB.setUsers([...usersDB.users, newUser]);
        //adding to the old array of usersDB and then adding newUser to the end
        await fsPromises.writeFile(
            path.join(__dirname,'..','model','users.json'),
            //^^ this overwirtes the users.json file
            JSON.stringify(usersDB.users)
            );
            console.log(usersDB.users);
            res.status(201).json({'success':`New users ${user} created`});
    }catch(err){
        res.status(500).json({'message':err.message}); //500 is server error
    }
}
module.exports = {handleNewUser};