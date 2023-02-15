import User, {printName as printUserName,printAge} from './userfs'
const user = new User('Bob',11)
console.log(user)
printUserName(user)
//User's name is bob