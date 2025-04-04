const express= require('express')

const router= express.Router()
const z= require('zod')
const {User} = require('../db')
const bcrypt = require('bcrypt')
const jwt= require('jsonwebtoken')
const {JWT_SECRET}= require('../config')
const {middleware}= require('../middleware')

router.post('/signup', async(req,res)=>{

    const requiredBody= z.object({
        username: z.string().email(),
        password: z.string().min(5),
        firstname: z.string().max(50),
        lastname: z.string().max(50)
    })

    const parsedBody= requiredBody.safeParse(req.body)

    if(!parsedBody.success){
        res.json({message:parsedBody.error})
        return
    }

    const {username,password,firstname,lastname} = req.body;

    const existingUser= await User.findOne({
        username:username
    })

    if(existingUser){
        res.status(411).json({message:"User already exists"})
        return
    }

    const hashedPassword= await bcrypt.hash(password,5) 

    const user= await User.create({
        username: username,
        password: hashedPassword,
        firstName: firstname,
        lastName: lastname
    })

    if(!user){
        res.status(401).json({message:"User could not be created"})
        return
    } else{
        
        
        res.json({message:"User created successfully"})
    }


})


router.post('/signin', async(req,res)=>{

    const requiredBody= z.object({
        username: z.string().email(),
        password: z.string().min(5),
    })

    const parsedBody= requiredBody.safeParse(req.body)

    if(!parsedBody.success){
        res.json({message:parsedBody.error})
        return
    }


    const username= req.body.username;
    const password= req.body.password;

    const user= await User.findOne({
        username:username
    })

    const verifiedPassword = await bcrypt.compare(password,user.password)
    const userId= user._id;
    if(verifiedPassword){
        const token= jwt.sign({userId},JWT_SECRET)
        res.json({token:token})
    } else{
        res.json({message:"Error while logging in"})
        return
    }
})


router.put('/',middleware,async(req,res)=>{

    const requiredBody= z.object({
        firstname: z.string().max(50).optional(),
        lastname: z.string().max(50).optional(),
        password: z.string().min(5).max(50).optional(),
    })

    const parsedBody= requiredBody.safeParse(req.body)

    if(!parsedBody.success){
        res.json({message:parsedBody.error})
        return
    }

    const userId= req.userId

    const {firstname,lastname,password}= req.body;
    const updatedFields={}

    if(firstname){ updatedFields.firstName= firstname }
    if(lastname){ updatedFields.lastName= lastname }

    if(password){
        updatedFields.password= await bcrypt.hash(password,5)
    }

    try{
        const updatedUser= await User.updateOne({_id:userId}, updatedFields)
        if(updatedUser){
            console.log(updatedUser)
            res.status(200).json({message:"User updated successfully"})
        }

    } catch(e){
        res.json("Error modifying data")
    }

})


router.get('/bulk', async(req,res)=>{
    const filter= req.query.filter || ""

    try{

        const users= await User.find({
            $or:[{firstName:{"$regex":filter,"$option":"i"}},{lastName:{"$regex":filter,"$option":"i"}}]
        })

        res.json({user:users.map(user=>({
            username: user.username,
            firstname: user.firstName,
            lastname: user.lastName,
            id: user._id
        }))})

    } catch(e){
        res.status(500).json({message:"Internal server error"})
    }

})




module.exports= router