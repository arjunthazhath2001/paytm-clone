require('dotenv').config()
const mongoose= require('mongoose')

mongoose.connect(process.env.MONGO_URL)

const userSchema= mongoose.Schema({
    username: {type:String,trim:true,required:true,lowercase:true,unique:true, minLenght:3, maxLength:30},
    password: {type:String,trim:true,required:true,minLenght:6},
    firstName: {type:String,trim:true,required:true, maxLength:50},
    lastName: {type:String,trim:true,required:true, maxLength:50},
})

const User= mongoose.model('User',userSchema)

module.exports={User}