const express= require('express')
const mongoose=require('mongoose')
const route=require('./routes/routes')
require('dotenv').config()
const app=express()

const port = 5040;
app.use(express.json())

mongoose.connect(process.env.MongoDbUrl)
.then(()=>{ console.log('MongoDb is Connected '); })
.catch((e)=>{ console.log(e); })


app.use('/',route)

app.listen(port , ()=>{ console.log(`server is running on ${port}`); })
