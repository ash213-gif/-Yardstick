const TransactionModel = require('../modules/tracsanctionschema')


exports.createtranaction = async (req, res) => {
    try {
        const { amount, date:dateString , category, description } = req.body;

        const transactionData = {
            amount,
            date: new Date(dateString), 
            category,
            description 
        };
        
        const transaction = new TransactionModel(transactionData);
        await transaction.save();

        return res.status(201).send({ status: true, msg: 'Transaction saved successfully', transaction });
    } catch (e) {
        return res.status(500).send({ status: false, message:e.msg });
    }
};


// Read All Transactions
exports.alltranasaction= async (req, res) => {
    try {
        const transactions = await TransactionModel.find();
        
        if(!transactions) { return res.status(400).send({ status:false ,msg :' tranaction not found ' }) }

        return res.status(200).send({ status: true, transactions:transactions });
    } catch (e) {
        console.log(e);
        return res.status(500).send({ status: false, message: e.msg });
    }

};

// Read Transaction by ID
exports.gettranaction=  async (req, res) => {
    try {
        const transaction = await TransactionModel.findById(req.params.id);
        if (!transaction) {
            return res.status(404).send({ status: false, msg: 'Transaction not found' });
        }
        return res.status(200).send({ status: true, transaction });
    } catch (e) {
        return res.status(500).send({ status: false, message: e.msg });
    }
};

// Update Transaction
exports.updatetransaction=  async (req, res) => {
    try {
        const { amount, date: dateString, category, description } = req.body;
        const date = new Date(dateString);

        // if (isNaN(date.getTime())) {
        //     return res.status(400).send({ status: false, msg: 'Invalid date format' });
        // }

        const transactionData = {
            amount,
            date: date,
            category,
            description
        };

        const transaction = await TransactionModel.findByIdAndUpdate(req.params.id, transactionData, { new: true });
        if (!transaction) {
            return res.status(404).send({ status: false, msg: 'Transaction not found' });
        }

        return res.status(200).send({ status: true, msg: 'Transaction updated successfully', transaction });
    } catch (e) {
        console.log(e);
        return res.status(500).send({ status: false, message: e.msg });
    }
};




// Delete Transaction
exports.deletetranaction=  async (req, res) => {
    try {
        const transaction = await TransactionModel.findByIdAndDelete(req.params.id);
        
        if (!transaction) {
            return res.status(404).send({ status: false, msg: 'Transaction not found' });
        }
        return res.status(200).send({ status: true, msg: 'Transaction deleted successfully' });
    } catch (e) {
        return res.status(500).send({ status: false, message: e.msg });
    }
};

