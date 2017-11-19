import expenseReducer from '../../reducers/expenses';
import expenseData from '../fixtures/expenses';


test("should set default state", () => {
    const state = expenseReducer(undefined, { type: "@@INIT"});
    expect(state).toEqual([]);

});

test("should add expense object to state", () => {
    const newExpense = {
        id: "5",
        description: "new guy",
        note: "new guy note",
        amount: 9005,
        createdAt: 12890044222
    };
    const state = expenseReducer(expenseData, { type: "ADD_EXPENSE", expense: newExpense });
    expect(state).toEqual([...expenseData, newExpense]);

});

test("should should edit expense object with provided values", () => {
    const currentState = {
        description: "A new description"
    };
    const action = expenseReducer(expenseData, { type: "EDIT_EXPENSE", id: expenseData[3].id, updates: currentState });
    expect(action[3].description).toEqual("A new description");

});


test("should should return expense object without editing", () => {
    const currentState = {
        description: "A new description"
    };
    const action = expenseReducer(expenseData, { type: "EDIT_EXPENSE", id: "10", updates: currentState });
    expect(action).toEqual([...expenseData]);

});

test("should return expense object without removing", () => {

    const action = expenseReducer(expenseData, { type: "REMOVE_EXPENSE", id: "10" });
    expect(action).toEqual([...expenseData]);

});


test("should return expense object after removing provided id", () => {

    const action = expenseReducer(expenseData, { type: "REMOVE_EXPENSE", id: expenseData[2].id });
    expect(action).toEqual([expenseData[0], expenseData[1], expenseData[3]]);

});

