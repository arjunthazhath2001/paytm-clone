const express= require('express')
const { middleware } = require('../middleware')
const { Account } = require('../db')
const mongoose= require('mongoose')

const router= express.Router()


router.get('/balance',middleware,async(req,res)=>{
    const userId= req.userId

    const user= await Account.findOne({
        user:userId
    })

    if(user){
        res.status(200).json({message:user.balance})
    }
    else{
        res.status(400).json({message:"User not found"})
    }
})


router.post('/transfer', middleware, async(req,res)=>{
    const session= await mongoose.startSession()

    session.startTransaction()
    console.log("started")
    const {to,amount}= req.body

    const userId= req.userId

    const user= await Account.findOne({
        user:userId
    }).session(session)

    if(!user || user.balance<amount){
        await session.abortTransaction()
        return res.status(400).json({message:'Insufficient balance'})
    }

    const toUser= await Account.findOne({
        user:to
    }).session(session)
    console.log("found")

    
    if(!toUser){
        await session.abortTransaction()
        res.status(400).json({message:'Account not found'})
    }

    await Account.updateOne({user:req.userId},{$inc:{balance:-amount}}).session(session)
    await Account.updateOne({user:to},{$inc:{balance:amount}}).session(session)

    await session.commitTransaction()
    res.json("Successfully transferred")
})

module.exports=router