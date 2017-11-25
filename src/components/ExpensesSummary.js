import React from 'react';
import {connect} from 'react-redux';
import numeral from 'numeral';
import selectExpenses from '../selectors/expenses';
import selectExpenseTotal from '../selectors/expenses-total';

const ExpensesSummary = ({expensesCount, expensesTotal}) => {
    const expenseWord = expensesCount === 1 ? 'expense' : 'expenses';
    const formatExpenseTotal = numeral(expensesTotal / 100).format('$0,0.00');

    return (
        <div>
            <h1>Viewing {expensesCount} {expenseWord} totalling {formatExpenseTotal} </h1>
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


