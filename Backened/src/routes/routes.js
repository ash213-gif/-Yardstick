const express = require('express')
const route=express.Router()
const {Transaction,updatetransaction ,gettranaction ,deletetranaction}= require('../controller/Trasaction')
const {TransactionMiddle  }= require('../middleware/TrancstionMiddle')

route.post('/setTransaction',TransactionMiddle ,Transaction)
route.get('/getalltranaction',gettranaction)
route.get('/gettranaction/:id',gettranaction)
route.delete('/deletetranaction/:id',deletetranaction)
route.put('/updatetransaction/:id',updatetransaction)

module.exports= route