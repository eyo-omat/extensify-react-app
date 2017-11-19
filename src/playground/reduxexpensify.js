import {createStore, combineReducers} from "redux";
import uuid from "uuid";


const addExpense = ({ description="", note="", amount=0, createdAt=0} = {}) => ({
    type: "ADD_EXPENSE",
    expense: {
        id: uuid(),
        description,
        note,
        amount,
        createdAt

    }
});

const removeExpense = ({id} = {}) => ({
    type: "REMOVE_EXPENSE",
    id
});

const editExpense = (id, updates) => ({
    type: "EDIT_EXPENSE",
    id,
    updates
});

const setTextFilter = (text = "") => ({
    type: "SET_TEXT_FILTER",
    text

});

const sortByAmount = () => ({
    type: "SORT_BY_AMOUNT",
    sortBy: "amount"

});

const sortByDate = (text = "") => ({
    type: "SORT_BY_DATE",
    sortBy: "date"

});

const setStartDate = (startDate = undefined) => ({
    type: "SET_START_DATE",
    startDate

});

const setEndDate = (endDate = undefined) => ({
    type: "SET_END_DATE",
    endDate

});

const getVisibleExpenses = (expenses, {text, sortBy, startDate, endDate}) => {
    return expenses.filter((expense) => {
        const startDateMatch = typeof startDate !== "number" || expense.createdAt >= startDate ;
        const endDateMatch = typeof endDate !== "number" || expense.createdAt <= endDate;
        const textMatch = expense.description.toLowerCase().includes(text.toLowerCase());

        return startDateMatch && endDateMatch && textMatch;

    }).sort((a, b) => {
        if (sortBy === "date") {
            return a.createdAt < b.createdAt ? 1 : -1;

        }
        if (sortBy === "amount") {
            return a.amount < b.amount ? 1 : -1;

        }

    });

};


const expenseReducerDefaultState = [];

const expensesReducer = (state = expenseReducerDefaultState, action) => {
    switch (action.type){
        case "ADD_EXPENSE":
            return [ ...state, action.expense];

        case "REMOVE_EXPENSE":
            return state.filter(({id}) => id !== action.id);

        case "EDIT_EXPENSE":
            return state.map((expense) => {
                if (expense.id === action.id) {
                    return { ...expense, ...action.updates}

                } else {
                    return expense;
                }

            });

        default:
            return state;

    }

};

const filterReducerDefaultState = { text: "", sortBy: "date", startDate: undefined, endDate: undefined };

const filterReducer = (state = filterReducerDefaultState, action) => {
    switch (action.type){
        case "SET_TEXT_FILTER":
            return { ...state, text: action.text};

        case "SORT_BY_AMOUNT":
            return { ...state, sortBy: action.sortBy};

        case "SORT_BY_DATE":
            return { ...state, sortBy: action.sortBy};

        case "SET_START_DATE":
            return { ...state, startDate: action.startDate};

        case "SET_END_DATE":
            return { ...state, endDate: action.endDate};

        default:
            return state;

    }

};


const store = createStore(
    combineReducers({
        expenses: expensesReducer,
        filters: filterReducer
    })
);

store.subscribe(() => {
    const state = store.getState();
    const visibleExpense = getVisibleExpenses(state.expenses, state.filters);
    console.log(visibleExpense);
});


 const expenseOne = store.dispatch(addExpense({ description: "Rent", amount: 300, createdAt: 1000 }));
 const expenseTwo = store.dispatch(addExpense({ description: "Coffee", amount: 500, createdAt: -1000 }));
 const expenseThree = store.dispatch(addExpense({ description: "Cake", amount: 800, createdAt: 300 }));
//
// store.dispatch(removeExpense({id: expenseOne.expense.id}));
//
// store.dispatch(editExpense(expenseTwo.expense.id, {amount: 250 }));
//
//
 //store.dispatch(setTextFilter("ee"));
// store.dispatch(setTextFilter(""));
//
// store.dispatch(sortByAmount());
 store.dispatch(sortByDate());

// store.dispatch(setStartDate(125));
// store.dispatch(setStartDate());
// store.dispatch(setEndDate(1250));



const demoState  = {
    expenses: [{
        id: "eytdgazbb",
        description: "November rent",
        note: "This is was my payment for  the first 6 months",
        amount: 6500,
        createdAt: 0,
    }],
    filters: {
        text: "rent",
        sortBy: "amount", //date or amount
        startDate: undefined,
        endDate: undefined

    }

};


