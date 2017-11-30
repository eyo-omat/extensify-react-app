import database from '../firebase/firebase';

export const addExpense = (expense) => ({
    type: "ADD_EXPENSE",
    expense
});

export const startAddExpense = (expenseData = {}) => {
    return (dispatch, getState) => {
        const uid = getState().auth.uid;
        const {
            description = "",
            note = "",
            amount = 0,
            createdAt = 0
        } = expenseData;

        const expense = {description, note, amount, createdAt};

        return database.ref(`users/${uid}/expenses`).push(expense).then((ref) => {
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
    return (dispatch, getState) => {
        const uid = getState().auth.uid;

        return database.ref(`users/${uid}/expenses`).child(id).remove().then(() => {
            dispatch(removeExpense({id}));
        });

    };
};

export const editExpense = (id, updates) => ({
    type: "EDIT_EXPENSE",
    id,
    updates
});

export const startEditExpense = (id, expenseData) => {
    return (dispatch, getState) => {
        const uid = getState().auth.uid;

        return database.ref(`users/${uid}/expenses`).child(id).update({
            ...expenseData

        }).then(() => {
            dispatch(editExpense(id, expenseData));
        });

    };
};

export const setExpense = (expenses) => ({
    type: 'SET_EXPENSE',
    expenses
});

export const startSetExpenses = () => {
    return (dispatch, getState) => {
        const expenseData = [];
        const uid = getState().auth.uid;

        return database.ref(`users/${uid}/expenses`).once('value', (snapShot) => {
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

