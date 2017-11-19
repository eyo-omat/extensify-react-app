import React from 'react';
import {shallow} from 'enzyme';
import moment from 'moment';
import ExpenseForm from '../../components/ExpenseForm';
import expenseData from '../fixtures/expenses';

test("should render Expense form correctly", () => {

    const wrapper = shallow(<ExpenseForm />);
    expect(wrapper).toMatchSnapshot();

});

test("should render Expense form with expense data", () => {

    const wrapper = shallow(<ExpenseForm expense={expenseData[2]}/>);
    expect(wrapper).toMatchSnapshot();

});

test("should render error for invalid form submission ", () => {

    const wrapper = shallow(<ExpenseForm />);
    expect(wrapper).toMatchSnapshot();
    wrapper.find('form').simulate('submit', { preventDefault: () => { }});
    expect(wrapper.state('error').length).toBeGreaterThan(0);
    expect(wrapper).toMatchSnapshot();

});


test("should set description on input change", () => {
    const value = 'New description';
    const wrapper = shallow(<ExpenseForm />);
    expect(wrapper).toMatchSnapshot();
    wrapper.find('input').at(0).simulate('change', { target:  { value }});
    expect(wrapper.state('description')).toBe(value);
    expect(wrapper).toMatchSnapshot();

});


test("should set note on textarea change", () => {
    const value = 'Note description';
    const wrapper = shallow(<ExpenseForm />);
    expect(wrapper).toMatchSnapshot();
    wrapper.find('textarea').simulate('change', { target:  { value }});
    expect(wrapper.state('note')).toBe(value);
    expect(wrapper).toMatchSnapshot();

});


test("should set amount on input change if valid", () => {
    const value = '23.24';
    const wrapper = shallow(<ExpenseForm />);
    expect(wrapper).toMatchSnapshot();
    wrapper.find('input').at(1).simulate('change', { target:  { value }});
    expect(wrapper.state('amount')).toBe(value);
    expect(wrapper).toMatchSnapshot();

});


test("should not set amount if invalid input", () => {
    const value = '23.24.23';
    const wrapper = shallow(<ExpenseForm />);
    expect(wrapper).toMatchSnapshot();
    wrapper.find('input').at(1).simulate('change', { target:  { value }});
    expect(wrapper.state('amount')).toBe("");
    expect(wrapper).toMatchSnapshot();

});


test("should call onSubmit prop for valid form submission", () => {
    const onSubmitSpy = jest.fn();
    const wrapper = shallow(<ExpenseForm  expense = {expenseData[0]} onSubmit ={onSubmitSpy}/>);
    wrapper.find('form').simulate('submit', { preventDefault: () => { }});

    expect(wrapper.state('error')).toBe('');
    expect(onSubmitSpy).toHaveBeenLastCalledWith({
        description: expenseData[0].description,
        amount: expenseData[0].amount,
        note: expenseData[0].note,
        createdAt: expenseData[0].createdAt

    });

});


test("should set new date on date change", () => {
    const now = moment();
    const wrapper = shallow(<ExpenseForm  />);
    wrapper.find('withStyles(SingleDatePicker)').prop('onDateChange')(now);

    expect(wrapper.state('createdAt')).toEqual(now);

});


test("should set calendar focus on date change", () => {
    const focused = true;
    const wrapper = shallow(<ExpenseForm  />);
    wrapper.find('withStyles(SingleDatePicker)').prop('onFocusChange')({ focused });

    expect(wrapper.state('calendarFocused')).toEqual(focused);

});

