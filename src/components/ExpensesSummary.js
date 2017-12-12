import React from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import numeral from 'numeral';
import selectExpenses from '../selectors/expenses';
import selectExpenseTotal from '../selectors/expenses-total';

const ExpensesSummary = ({expensesCount, expensesTotal}) => {
    const expenseWord = expensesCount === 1 ? 'expense' : 'expenses';
    const formatExpenseTotal = numeral(expensesTotal / 100).format('$0,0.00');

    return (
        <div className="page-header">
            <div className="content-container">
                <h1 className="page-header__title">
                    Viewing <span>{expensesCount}</span> {expenseWord} totalling <span>{formatExpenseTotal}</span>
                </h1>
                <div className="page-header__actions">
                    <Link to="/create" className="button">Add Expense </Link>

                </div>
            </div>
        </div>

    );
};

const mapStateToProps = (state) => {
    const visibleExpense = selectExpenses(state.expenses, state.filters);
    return {
        expensesCount: visibleExpense.length,
        expensesTotal: selectExpenseTotal(visibleExpense)

    };

};

export default connect(mapStateToProps)(ExpensesSummary);


