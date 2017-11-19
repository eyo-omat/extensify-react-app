import React from 'react';
import {shallow} from 'enzyme';
import ExpenseListItem from '../../components/ExpenseListItem';
import expenseData from '../fixtures/expenses';

test('should render expenseListItem with expense data', () => {
    const wrapper = shallow(<ExpenseListItem {...expenseData[1]}/>);
    expect(wrapper).toMatchSnapshot();

});


