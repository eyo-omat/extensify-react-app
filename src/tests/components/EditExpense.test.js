import React from 'react';
import {shallow} from 'enzyme';
import {EditExpensePage} from '../../components/EditExpensePage';
import expenseData from '../fixtures/expenses';

let editExpense, startRemoveExpense, history, wrapper;

beforeEach(() => {
    editExpense = jest.fn();
    startRemoveExpense = jest.fn();
    history = { push: jest.fn() };
    wrapper = shallow(<EditExpensePage editExpense={editExpense} startRemoveExpense={startRemoveExpense} expense={expenseData[1]} history={history} />)
});

test("should render Edit Expense page correctly", () => {
    expect(wrapper).toMatchSnapshot();

});

test("should handle editExpense", () => {
    wrapper.find('ExpenseForm').prop('onSubmit')(expenseData[1]);
    expect(history.push).toHaveBeenLastCalledWith('/');
    expect(editExpense).toHaveBeenLastCalledWith(expenseData[1].id, expenseData[1]);


});

test("should handle startRemoveExpense", () => {
    wrapper.find('button').simulate('click');
    expect(history.push).toHaveBeenLastCalledWith('/');
    expect(startRemoveExpense).toHaveBeenLastCalledWith({id: expenseData[1].id});


});



