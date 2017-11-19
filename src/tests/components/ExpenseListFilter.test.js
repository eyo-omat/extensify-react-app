import React from 'react';
import {shallow} from 'enzyme';
import moment from 'moment';
import {ExpenseListFilters} from '../../components/ExpenseListFilters';
import expenseData from '../fixtures/expenses';
import {filters, defaultFilters} from '../fixtures/filters';

let setTextFilter, sortByAmount, sortByDate, setStartDate, setEndDate, wrapper;

beforeEach(() => {
    setTextFilter = jest.fn();
    sortByDate = jest.fn();
    sortByAmount = jest.fn();
    setStartDate = jest.fn();
    setEndDate = jest.fn();

    wrapper = shallow(<ExpenseListFilters
        filters={defaultFilters}
        setTextFilter={setTextFilter}
        sortByAmount={sortByAmount}
        sortByDate={sortByDate}
        setStartDate={setStartDate}
        setEndDate={setEndDate}

    />)
});

test("should render ExpenseListFilters correctly", () => {
    expect(wrapper).toMatchSnapshot();

});


test("should render ExpenseListFilters with provided data correctly", () => {
    wrapper.setProps( {filters: filters} );
    expect(wrapper).toMatchSnapshot();

});


test("should handle text change", () => {
    const value = 'rent';
    wrapper.find('input').at(0).simulate('change', { target:  { value }});
    expect(setTextFilter).toHaveBeenLastCalledWith(value);

});

test("should sort by date", () => {
    const value = 'date';
    wrapper.setProps( {filters: filters} );
    wrapper.find('select').simulate('change', { target:  { value }});
    expect(sortByDate).toHaveBeenCalled();

});


test("should sort by amount", () => {
    const value = 'amount';
    wrapper.find('select').simulate('change', { target:  { value }});
    expect(sortByAmount).toHaveBeenCalled();

});

test("should handle date changes", () => {
    const startDate = moment(0).add(4, 'years');
    const endDate = moment(0).add(8, 'years');
    wrapper.find('withStyles(DateRangePicker)').prop('onDatesChange')({startDate, endDate});
    expect(setStartDate).toHaveBeenLastCalledWith(startDate);
    expect(setEndDate).toHaveBeenLastCalledWith(endDate);

});

test("should handle date focus changes", () => {
    const calendarFocused = 'endDate';
    const endDate = moment(0).add(8, 'years');
    wrapper.find('withStyles(DateRangePicker)').prop('onFocusChange')( calendarFocused);
    expect(wrapper.state('calendarFocused')).toBe(calendarFocused);
});



