import React from 'react';
import {shallow} from 'enzyme';
import { ExpenseList } from '../../components/ExpenseList';
import expsenseData from '../fixtures/expenses';

test('should render expenseList with expenses', () => {
   const wrapper = shallow(<ExpenseList expenses={expsenseData}/>);
   expect(wrapper).toMatchSnapshot();

});

test('should render expenseList with empty message', () => {
   const wrapper = shallow(<ExpenseList expenses={[]}/>);
   expect(wrapper).toMatchSnapshot();

});
