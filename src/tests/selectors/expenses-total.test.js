import selectedExpensesTotal from '../../selectors/expenses-total';
import expenseData from '../fixtures/expenses';

test('should return total expenses from data provided', ()  => {

    const result = selectedExpensesTotal(expenseData);
    expect(result).toBe(4958)

});

test('should return 0 for no data provided', ()  => {

    const result = selectedExpensesTotal([]);
    expect(result).toBe(0)

});

test('should return amount for single expense provided', ()  => {

    const result = selectedExpensesTotal([expenseData[0]]);
    expect(result).toBe(4500)

});


