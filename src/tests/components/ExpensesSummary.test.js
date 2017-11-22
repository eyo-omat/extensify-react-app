import React from 'react';
import {shallow} from 'enzyme';
import ExpensesSummary from '../../components/ExpensesSummary';

test('should render expenses summary with total data', () => {
    const wrapper = shallow(<ExpensesSummary expensesCount={1} expensesTotal={2343}/>);
    expect(wrapper).toMatchSnapshot();

});
test('should render expenses summary with multiple data', () => {
    const wrapper = shallow(<ExpensesSummary expensesCount={54} expensesTotal={23498333}/>);
    expect(wrapper).toMatchSnapshot();

});