const mongoose = require('mongoose')
const Schema = mongoose.Schema

const userSchema = Schema({

    name:{
        type:String,
        unique:[true, 'Name already exist.'],
        required:[true, 'Name is required!']
    },
    email:{
        type:String,
        unique:[true, 'Email already exist.'],
        required:[true, 'Email is required!']
    },
    password:{
        type:String,
        required:[true, 'Password is required!'],
    },
    img:{
        type:String
        
    },
 


},{timestamps:true}
)

const userModel = mongoose.model("Users", userSchema)

module.exports = userModel


