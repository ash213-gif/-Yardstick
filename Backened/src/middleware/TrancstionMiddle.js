// Middleware for validating transaction data
exports.TransactionMiddle = (req, res, next) => {
    try {
        const { Amount, Date, Category, Description } = req.body;


        if (!Amount) { return res.status(400).send({ status: false, msg: 'Amount is required' }); }
        if (Amount <= 0) {
            return res.status(400).send({ status: false, msg: 'amount must be greater than 0' })
        }
        if (!Date) { return res.status(400).send({ status: false, msg: 'Date is required' }); }
        if (!Category) { return res.status(400).send({ status: false, msg: 'Category is required' }); }
        if (!Description) { return res.status(400).send({ status: false, msg: 'Description is required' }); }
        next()
    } catch (e) {
        return res.status(500).send({ status: false, msg: e.message });
    }
};
