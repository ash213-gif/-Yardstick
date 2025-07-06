const express = require('express')
const route=express.Router()
const {Transaction,updatetransaction ,gettranaction ,deletetranaction}= require('../controller/Trasaction')
const {DeleteBudget,GetBudget,CreateBudget} =require('../controller/Monthlycontrol')
const {TransactionMiddle  }= require('../middleware/TrancstionMiddle')

route.post('/setTransaction',TransactionMiddle ,Transaction)
route.get('/getalltranaction',gettranaction)
route.get('/gettranaction/:id',gettranaction)
route.delete('/deletetranaction/:id',deletetranaction)
route.put('/updatetransaction/:id',updatetransaction)

route.get('/', (req,res)=>{
    res.send('my roytes is working ')
} )

// Monthly Bugete route
route.post('/createBudget' , CreateBudget)
route.get('/getBudget' , GetBudget)
route.delete('/deleteBudget' , DeleteBudget)


module.exports= route

