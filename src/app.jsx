import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import AppRouter from './routers/AppRouter';
import configureStore from './store/configureStore';
import {addExpense} from './actions/expenses';
import {setTextFilter} from './actions/filters';
import getVisibleExpenses from './selectors/expenses';
import 'react-dates/lib/css/_datepicker.css';
import "normalize.css/normalize.css"
import "./styles/styles.scss"

const store = configureStore();

store.dispatch(addExpense({description: "Rent", amount: 10950}));
store.dispatch(addExpense({description: "Water Bill", amount: 80}));
store.dispatch(addExpense({description: "Gas Bill", createdAt: 1000}));



const state = store.getState();
const visibleExpense = getVisibleExpenses(state.expenses, state.filters);
console.log(visibleExpense);

const jsx = (
    <Provider store={store} children={AppRouter}>


    </Provider>

);

ReactDOM.render(jsx, document.getElementById("app"));

