const express= require('express')

const router= express.Router()

const userRouter = require('./user')
const accountRouter = require('./account')


router.use('/user',userRouter) //which means whenever a request comes to api/v1/user that logic will be handled by userRouter which is nothing but /user.js file inside the routes folder
router.use('/account',accountRouter) //which means whenever a request comes to api/v1/user that logic will be handled by userRouter which is nothing but /user.js file inside the routes folder



module.exports= router;