const express = require("express");
const mainRouter= require('./routes/index')
const cors = require('cors')
const app= express()

app.use(cors()) // since our frontend is going to be hosted somewhere in another route to prevent cors error

app.use(express.json()) //so that our backend is able to read the json data thats coming from the frontend


app.use("/api/v1",mainRouter) //it means that any request that comes to /api/v1 should be handled by mainRouter which is inside the routes/index files


app.listen(3000, ()=>{console.log("listening")})