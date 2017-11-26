import configureMockStore from "redux-mock-store";
import thunk from "redux-mock-store";
import {addExpense, editExpense, removeExpense, startAddExpense, setExpense, startSetExpenses} from "../../actions/expenses";
import expenseData from '../fixtures/expenses';
import database from '../../firebase/firebase';

const createMockStore = configureMockStore([thunk]);

beforeEach((done) => {
   const expenses = {};
    expenseData.forEach(({id, description, note, amount, createdAt}) => {
        expenses[id] = {description, note, amount, createdAt};
    });
    database.ref('expenses').set(expenses).then(() => done());
});

test("should setup remove expense action object", () => {
    const action = removeExpense({id: "123ead"});
    expect(action).toEqual({
        type: "REMOVE_EXPENSE",
        id: "123ead"
    });

});

test("should setup edit expense action object", () => {
    const action = editExpense("123ead", {description: "A new description"});
    expect(action).toEqual({
        type: "EDIT_EXPENSE",
        id: "123ead",
        updates: {description: "A new description"}
    });

});

test("should setup add expense action object with provided values", () => {
    const action = addExpense(expenseData[2]);
    expect(action).toEqual({
        type: "ADD_EXPENSE",
        expense: expenseData[2]
    });

});

test("should add expense to database and store", (done) => {
    const store = createMockStore({});

    const expenseData = {
        description: "Mouse",
        note: "Magic ouse",
        amount: 3000,
        createdAt: 1000
    };

    store.dispatch(startAddExpense(expenseData)).then(() => {
        const actions = store.getActions();
        expect(actions[0]).toEqual({
            type: "ADD_EXPENSE",
            id: expect.any(String),
            ...expenseData
        });

        return database.ref(`expenses/${actions[0].expense.id}`).once('value');
    }).then((snapshot) => {
        expect(snapshot.val()).toEqual(expenseData);
        done();
    });


});


test("should add expense with defaults to database and store", (done) => {
    const store = createMockStore({});

    const expenseData = {
        description: "",
        note: "",
        amount: 0,
        createdAt: 0
    };

    store.dispatch(startAddExpense(expenseData)).then(() => {
        const actions = store.getActions();
        expect(actions[0]).toEqual({
            type: "ADD_EXPENSE",
            id: expect.any(String),
            ...expenseData
        });

        return database.ref(`expenses/${actions[0].expense.id}`).once('value');
    }).then((snapshot) => {
        expect(snapshot.val()).toEqual(expenseData);
        done();
    });


});


test("should setup set expense action object with date", () => {

    const action = setExpense(expenseData);
    expect(action).toEqual({
        type: 'SET_EXPENSE',
        expenses: expenseData
    });

});


test("should set expense from firebase", (done) => {
    const store = createMockStore({});

    store.dispatch(startSetExpenses()).then(() => {
        const actions = store.getActions();
        expect(actions[0]).toEqual({
            type: "SET_EXPENSE",
            expenses: expenseData
        });

        done();
    });


});

