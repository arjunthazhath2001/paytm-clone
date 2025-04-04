require('dotenv').config()

const mongoose= require('mongoose')

mongoose.connect(process.env.MONGO_URL).then(()=>console.log('connected to db')).catch((err)=>console.log("couldn't connect"))


const userSchema= mongoose.Schema({
    username: {type:String, required:true, trim:true, unique:true, lowercase:true, minLength:3, maxLength:50},
    firstName: {type:String, required:true, trim:true, maxLength:50},
    lastName: {type:String, required:true, trim:true, maxLength:50},
    password: {type:String, required:true, trim:true,minLength:5},
})


const User= mongoose.model('User', userSchema)

const accountSchema= mongoose.Schema({
    user:{type:mongoose.Schema.Types.ObjectId, ref:"User" , required:true},
    balance:{type:Number,required:true}
})


const Account= mongoose.model('Account',accountSchema)


module.exports={User, Account}