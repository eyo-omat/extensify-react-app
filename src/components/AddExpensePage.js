import React from 'react';
import ExpenseForm from './ExpenseForm';
import {connect} from 'react-redux';
import {startExpense} from "../actions/expenses";

export class AddExpensePage extends React.Component {
    onSubmit = (expense) => {
        this.props.startExpense(expense);
        this.props.history.push('/');
    };

    render() {
        return (
            <div>
                <h1>Add Expense</h1>
                <ExpenseForm
                    onSubmit={this.onSubmit}
                />
            </div>
        );
    }
}
const mapDispatchToProps = (dispatch) => ({startExpense: (expense) => dispatch(startExpense(expense))});


export default connect(undefined, mapDispatchToProps)(AddExpensePage);
