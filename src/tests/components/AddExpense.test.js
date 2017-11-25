import React from 'react';
import {shallow} from 'enzyme';
import {AddExpensePage} from '../../components/AddExpensePage';
import expenseData from '../fixtures/expenses';


let startExpense, history, wrapper;

beforeEach(() => {
    startExpense = jest.fn();
    history = { push: jest.fn() };
    wrapper = shallow(<AddExpensePage startExpense={startExpense} history={history} />)
});

test("should render Add Expense page correctly", () => {
    expect(wrapper).toMatchSnapshot();

});


test("should handle onSubmit", () => {
    wrapper.find('ExpenseForm').prop('onSubmit')(expenseData[0]);
    expect(history.push).toHaveBeenLastCalledWith('/');
    expect(startExpense).toHaveBeenLastCalledWith(expenseData[0]);


});






