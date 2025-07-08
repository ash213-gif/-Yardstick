const express = require('express')
const route=express.Router()

const {createtranaction,gettranaction,updatetransaction,deletetranaction} =require('../controller/Trasaction')
const {CreateBudget,deletbudget,getbudget,getcotegoryexpenses,getbudgetcomparison,getanalyticsdash}=require('../controller/Monthlycontrol')
const {TransactionMiddle  }= require('../middleware/TrancstionMiddle')


route.post('/createtranaction',createtranaction)
route.get('/gettranaction/:id',gettranaction)
route.put('/updatetransaction',updatetransaction)
route.delete('/deletetranaction' ,deletetranaction)

// monthly budgte 

route.post('/CreateBudget',CreateBudget)
route.delete('/deletbudget',deletbudget)
route.get('/getbudget',getbudget)
route.get('/getcotegoryexpenses',getcotegoryexpenses)
route.get('/getbudgetcomparison',getbudgetcomparison)
route.get('/getanalyticsdash',getanalyticsdash)



module.exports= route

