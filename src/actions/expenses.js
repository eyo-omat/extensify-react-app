import database from '../firebase/firebase';

export const addExpense = (expense) => ({
    type: "ADD_EXPENSE",
    expense
});

export const startAddExpense = (expenseData = {}) => {
    return (dispatch) => {
        const {
            description = "",
            note = "",
            amount = 0,
            createdAt = 0
        } = expenseData;

        const expense = {description, note, amount, createdAt};

        return database.ref("expenses").push(expense).then((ref) => {
            dispatch(addExpense({
                id: ref.key,
                ...expense
            }));

        });

    };
};

export const removeExpense = ({id} = {}) => ({
    type: "REMOVE_EXPENSE",
    id
});

export const startRemoveExpense = ({id} = {}) => {
    return (dispatch) => {

        return database.ref("expenses").child(id).remove().then(() => {
            dispatch(removeExpense({id}));
        });

    };
};

export const editExpense = (id, updates) => ({
    type: "EDIT_EXPENSE",
    id,
    updates
});

export const setExpense = (expenses) => ({
    type: 'SET_EXPENSE',
    expenses
});

export const startSetExpenses = () => {
    return (dispatch) => {
        const expenseData = [] ;

        return database.ref("expenses").once('value', (snapShot) => {
            snapShot.forEach((childSnapshot) => {
                expenseData.push({
                    id: childSnapshot.key,
                    ...childSnapshot.val()
                });
            });

        }).then(() => {
            dispatch(setExpense(expenseData));
        });

    };
};

