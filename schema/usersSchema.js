const mongoose = require('mongoose');
const validator = require('validator')


const UsersSchema = new mongoose.Schema({
    
    firstName:{type:String, require:true},
    middleNmae:{type:String},
    lastName:{type:String, require:true},
    email:{type:String, require:true,
      validate:(value)=>validator.isEmail(value)
    },
    password:{type:String, require:true},
    role:{type:String, default:"user"},
    status:{type:String, default:"y"},
    createdAt:{type:Date, default:Date.now()}

},{versionKey:false,collection:'user'})

const UserModel = mongoose.model('user',UsersSchema)
module.exports = {UserModel}

