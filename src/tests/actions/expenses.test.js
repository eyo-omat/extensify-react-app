import configureMockStore from "redux-mock-store";
import thunk from "redux-mock-store";
import {addExpense, editExpense, removeExpense, startExpense} from "../../actions/expenses";
import expenseData from '../fixtures/expenses';
import database from '../../firebase/firebase';

const createMockStore = configureMockStore([thunk]);


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

    store.dispatch(startExpense(expenseData)).then(() => {
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

    store.dispatch(startExpense(expenseData)).then(() => {
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


// test("should setup add expense action object with default values", () => {
//
//     const action = addExpense();
//     expect(action).toEqual({
//         type: "ADD_EXPENSE",
//         expense: {
//             id: expect.any(String),
//             description: "",
//             note: "",
//             amount: 0,
//             createdAt: 0
//         }
//     });
//
// });
//
//
// test("should setup add expense action object with default values", () => {
//
//     const action = addExpense();
//     expect(action).toEqual({
//         type: "ADD_EXPENSE",
//         expense: {
//             id: expect.any(String),
//             description: "",
//             note: "",
//             amount: 0,
//             createdAt: 0
//         }
//     });
//
// });

