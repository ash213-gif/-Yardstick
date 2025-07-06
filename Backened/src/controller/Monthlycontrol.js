const MonthlySchema = require('../modules/monthlyschema');

// Create or Update Budget
exports.CreateBudget = async (req, res) => {
    try {
        const { Category, Amount } = req.body;
        const month = req.body.month || new Date().toISOString().slice(0, 7);

        const budget = await MonthlySchema.findOneAndUpdate(
            { Category, month },
            { Amount },
            { new: true, upsert: true, runValidators: true }
        );

        res.send({
            success: true,
            data: budget,
            msg: 'Budget updated successfully'
        });

    } catch (error) {
        console.error('Error updating budget:', error);
        res.status(500).send({ status: false, message: error.msg });
    }
};

// Get Budget
exports.GetBudget = async (req, res) => {
    try {
        const { Category, month } = req.query;

        const budget = await MonthlySchema.findOne({ Category, month });

        if (!budget) {
            return res.status(404).send({
                success: false,
                msg: 'Budget not found'
            });
        }

        res.send({
            success: true,
            data: budget,
            msg: 'Budget retrieved successfully'
        });

    } catch (error) {
        console.error('Error retrieving budget:', error);
        res.status(500).send({ success: false, message: error.msg });
    }
};


// Delete Budget
exports.DeleteBudget = async (req, res) => {
    try {
        const { month } = req.query;
        const currentMonth = month || new Date().toISOString().slice(0, 7);

        const budget = await Budget.findOneAndDelete({
            category: req.params.category,
            month: currentMonth
        });

        if (!budget) {
            return res.status(404).json({
                success: false,
                message: 'Budget not found'
            });
        }

        res.json({
            success: true,
            message: 'Budget deleted successfully'
        });
    } catch (error) {
        console.error('Error deleting budget:', error);
        res.status(500).json({
            success: false,
            message: 'Error deleting budget'
        });
    }
};
