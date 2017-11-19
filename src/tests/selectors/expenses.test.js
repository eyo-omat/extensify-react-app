import moment from 'moment';
import selectedExpenses from '../../selectors/expenses';
import expenseData from '../fixtures/expenses';

test('should filter by text value', ()  => {
    const filters = {
        text: "e",
        sortBy: "date",
        startDate: undefined,
        endDate: undefined,
    };

    const result = selectedExpenses(expenseData, filters);
    expect(result).toEqual([ expenseData[2], expenseData[0], ])

});

test('should filter by startDate', ()  => {
    const filters = {
        text: "",
        sortBy: "date",
        startDate: moment(0),
        endDate: undefined,
    };

    const result = selectedExpenses(expenseData, filters);
    expect(result).toEqual([ expenseData[2], expenseData[1], expenseData[0] ])

});

test('should filter by endDate', ()  => {
    const filters = {
        text: "",
        sortBy: "date",
        startDate: undefined,
        endDate: moment(0),
    };

    const result = selectedExpenses(expenseData, filters);
    expect(result).toEqual([ expenseData[0], expenseData[3] ])

});

test('should sort by date', ()  => {
    const filters = {
        text: "",
        sortBy: "date",
        startDate: undefined,
        endDate: undefined,
    };

    const result = selectedExpenses(expenseData, filters);
    expect(result).toEqual([ expenseData[2], expenseData[1], expenseData[0], expenseData[3] ])

});

test('should sort by amount', ()  => {
    const filters = {
        text: "",
        sortBy: "amount",
        startDate: undefined,
        endDate: undefined,
    };

    const result = selectedExpenses(expenseData, filters);
    expect(result).toEqual([ expenseData[0], expenseData[1], expenseData[3], expenseData[2] ])

});

