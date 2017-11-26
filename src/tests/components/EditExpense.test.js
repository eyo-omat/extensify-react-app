import React from 'react';
import {shallow} from 'enzyme';
import {EditExpensePage} from '../../components/EditExpensePage';
import expenseData from '../fixtures/expenses';

let startEditExpense, startRemoveExpense, history, wrapper;

beforeEach(() => {
    startEditExpense = jest.fn();
    startRemoveExpense = jest.fn();
    history = { push: jest.fn() };
    wrapper = shallow(<EditExpensePage startEditExpense={startEditExpense} startRemoveExpense={startRemoveExpense} expense={expenseData[1]} history={history} />)
});

test("should render Edit Expense page correctly", () => {
    expect(wrapper).toMatchSnapshot();

});

test("should handle startEditExpense", () => {
    wrapper.find('ExpenseForm').prop('onSubmit')(expenseData[1]);
    expect(history.push).toHaveBeenLastCalledWith('/');
    expect(startEditExpense).toHaveBeenLastCalledWith(expenseData[1].id, expenseData[1]);


});

test("should handle startRemoveExpense", () => {
    wrapper.find('button').simulate('click');
    expect(history.push).toHaveBeenLastCalledWith('/');
    expect(startRemoveExpense).toHaveBeenLastCalledWith({id: expenseData[1].id});


});



