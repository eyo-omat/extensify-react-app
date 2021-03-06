import configureMockStore from "redux-mock-store";
import thunk from "redux-mock-store";
import {addExpense, editExpense, removeExpense,
    startAddExpense, setExpense, startSetExpenses,
    startRemoveExpense, startEditExpense} from "../../actions/expenses";
import expenseData from '../fixtures/expenses';
import database from '../../firebase/firebase';

const uid = 'thisistestuid';
const defaultAuthState = { auth: {uid}};
const createMockStore = configureMockStore([thunk]);

beforeEach((done) => {
   const expenses = {};
    expenseData.forEach(({id, description, note, amount, createdAt}) => {
        expenses[id] = {description, note, amount, createdAt};
    });
    database.ref(`users/${uid}/expenses`).set(expenses).then(() => done());
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
    const store = createMockStore(defaultAuthState);

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

        return database.ref(`users/${uid}/expenses/${actions[0].expense.id}`).once('value');
    }).then((snapshot) => {
        expect(snapshot.val()).toEqual(expenseData);
        done();
    });


});


test("should add expense with defaults to database and store", (done) => {
    const store = createMockStore(defaultAuthState);

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

        return database.ref(`users/${uid}/expenses/${actions[0].expense.id}`).once('value');
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
    const store = createMockStore(defaultAuthState);

    store.dispatch(startSetExpenses()).then(() => {
        const actions = store.getActions();
        expect(actions[0]).toEqual({
            type: "SET_EXPENSE",
            expenses: expenseData
        });

        done();
    });


});

test("should remove expense from firebase", (done) => {

    const store = createMockStore(defaultAuthState);
    const id = expenseData[0].id;

    store.dispatch(startRemoveExpense({id})).then(() => {
        const actions = store.getActions();
        expect(actions[0]).toEqual({
            type: "REMOVE_EXPENSE",
            id
        });

        return database.ref(`users/${uid}/expenses/${id}`).once('value');
    }).then((snapshot) => {
        expect(snapshot.val()).toBeFalsy();
        done();
    });


});

test("should edit expense from firebase", (done) => {
    const store = createMockStore(defaultAuthState);
    const id = expenseData[0].id;

    store.dispatch(startEditExpense(id, {description: "Firebase description"})).then(() => {
        const actions = store.getActions();
        expect(actions[0]).toEqual({
            type: "EDIT_EXPENSE",
            id,
            updates: {description: "Firebase description"}
        });

        return database.ref(`users/${uid}/expenses/${id}`).once('value');
    }).then((snapshot) => {
        const expense =snapshot.val();
        expect(expense.description).toBe("Firebase description");
        done();
    });


});

