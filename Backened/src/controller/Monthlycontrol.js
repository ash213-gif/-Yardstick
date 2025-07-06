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

// DELETE /api/budgets/:category - Delete budget

exports.deletbudget = async (req, res) => {
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

// Analytics Routes

// GET /api/analytics/monthly-expenses - Get monthly expenses
exports.getbudget = async (req, res) => {
    try {
        const { months = 12 } = req.query;

        const pipeline = [
            {
                $group: {
                    _id: {
                        year: { $year: '$date' },
                        month: { $month: '$date' }
                    },
                    total: { $sum: '$amount' },
                    count: { $sum: 1 }
                }
            },
            {
                $sort: { '_id.year': -1, '_id.month': -1 }
            },
            {
                $limit: parseInt(months)
            }
        ];

        const monthlyExpenses = await Transaction.aggregate(pipeline);

        const formattedData = monthlyExpenses.map(item => ({
            month: `${item._id.year}-${item._id.month.toString().padStart(2, '0')}`,
            total: item.total,
            count: item.count
        })).reverse();

        res.json({
            success: true,
            data: formattedData
        });
    } catch (error) {
        console.error('Error fetching monthly expenses:', error);
        res.status(500).json({
            success: false,
            message: 'Error fetching monthly expenses'
        });
    }
}


// GET /api/analytics/category-expenses - Get category-wise expenses
exports.getcotegoryexpenses=async (req, res) => {
    try {
        const { month, startDate, endDate } = req.query;

        let matchStage = {};

        if (month) {
            const [year, monthNum] = month.split('-');
            matchStage = {
                $expr: {
                    $and: [
                        { $eq: [{ $year: '$date' }, parseInt(year)] },
                        { $eq: [{ $month: '$date' }, parseInt(monthNum)] }
                    ]
                }
            };
        } else if (startDate || endDate) {
            matchStage.date = {};
            if (startDate) matchStage.date.$gte = new Date(startDate);
            if (endDate) matchStage.date.$lte = new Date(endDate);
        } else {
            // Default to current month
            const now = new Date();
            matchStage = {
                $expr: {
                    $and: [
                        { $eq: [{ $year: '$date' }, now.getFullYear()] },
                        { $eq: [{ $month: '$date' }, now.getMonth() + 1] }
                    ]
                }
            };
        }

        const pipeline = [
            { $match: matchStage },
            {
                $group: {
                    _id: '$category',
                    total: { $sum: '$amount' },
                    count: { $sum: 1 }
                }
            },
            {
                $sort: { total: -1 }
            }
        ];

        const categoryExpenses = await Transaction.aggregate(pipeline);

        const formattedData = categoryExpenses.map(item => ({
            category: item._id,
            total: item.total,
            count: item.count
        }));

        res.json({
            success: true,
            data: formattedData
        });
    } catch (error) {
        console.error('Error fetching category expenses:', error);
        res.status(500).json({
            success: false,
            message: 'Error fetching category expenses'
        });
    }
}

// GET /api/analytics/budget-comparison - Get budget vs actual comparison
exports.getbudgetcomparison=async (req, res) => {
    try {
        const { month } = req.query;
        const currentMonth = month || new Date().toISOString().slice(0, 7);

        // Get budgets for the month
        const budgets = await Budget.find({ month: currentMonth });

        // Get actual expenses for the month
        const [year, monthNum] = currentMonth.split('-');
        const actualExpenses = await Transaction.aggregate([
            {
                $match: {
                    $expr: {
                        $and: [
                            { $eq: [{ $year: '$date' }, parseInt(year)] },
                            { $eq: [{ $month: '$date' }, parseInt(monthNum)] }
                        ]
                    }
                }
            },
            {
                $group: {
                    _id: '$category',
                    actual: { $sum: '$amount' }
                }
            }
        ]);

        // Create comparison data
        const comparisonData = budgets.map(budget => {
            const actualExpense = actualExpenses.find(exp => exp._id === budget.category);
            const actualAmount = actualExpense ? actualExpense.actual : 0;

            return {
                category: budget.category,
                budget: budget.amount,
                actual: actualAmount,
                difference: budget.amount - actualAmount,
                percentage: (actualAmount / budget.amount) * 100
            };
        });

        res.json({
            success: true,
            data: comparisonData,
            month: currentMonth
        });
    } catch (error) {
        console.error('Error fetching budget comparison:', error);
        res.status(500).json({
            success: false,
            message: 'Error fetching budget comparison'
        });
    }
}

// GET /api/analytics/dashboard - Get dashboard summary

exports.getanalyticsdash=async (req, res) => {
    try {
        const currentMonth = new Date().toISOString().slice(0, 7);
        const [year, monthNum] = currentMonth.split('-');

        // Current month expenses
        const currentMonthExpenses = await Transaction.aggregate([
            {
                $match: {
                    $expr: {
                        $and: [
                            { $eq: [{ $year: '$date' }, parseInt(year)] },
                            { $eq: [{ $month: '$date' }, parseInt(monthNum)] }
                        ]
                    }
                }
            },
            {
                $group: {
                    _id: null,
                    total: { $sum: '$amount' },
                    count: { $sum: 1 }
                }
            }
        ]);

        // Total budget for current month
        const totalBudget = await Budget.aggregate([
            {
                $match: { month: currentMonth }
            },
            {
                $group: {
                    _id: null,
                    total: { $sum: '$amount' }
                }
            }
        ]);

        // Recent transactions
        const recentTransactions = await Transaction.find()
            .sort({ date: -1 })
            .limit(5);

        const monthlyTotal = currentMonthExpenses[0]?.total || 0;
        const budgetTotal = totalBudget[0]?.total || 0;
        const budgetUtilization = budgetTotal > 0 ? (monthlyTotal / budgetTotal) * 100 : 0;

        res.json({
            success: true,
            data: {
                currentMonthExpenses: monthlyTotal,
                totalBudget: budgetTotal,
                budgetUtilization,
                transactionCount: currentMonthExpenses[0]?.count || 0,
                recentTransactions
            }
        });
    } catch (error) {
        console.error('Error fetching dashboard data:', error);
        res.status(500).json({
            success: false,
            message: 'Error fetching dashboard data'
        });
    }
}
