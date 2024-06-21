import React, { createContext, useReducer } from 'react';

const AppReducer = (state, action) => {
    switch (action.type) {
        case 'CHANGE_CURRENCY':
            return {
                ...state,
                currency: action.payload,
            };
        case 'ADD_EXPENSE':
            return {
                ...state,
                expenses: [...state.expenses, action.payload],
            };
        case 'RED_EXPENSE':
            return {
                ...state,
                expenses: state.expenses.map(expense =>
                    expense.name === action.payload.name
                        ? { ...expense, cost: expense.cost - action.payload.cost }
                        : expense
                ),
            };
        default:
            return state;
    }
};

const initialState = {
    budget: 1000,
    expenses: [],
    currency: '£', // Начальное значение валюты
};

export const AppContext = createContext(initialState);

export const AppProvider = ({ children }) => {
    const [state, dispatch] = useReducer(AppReducer, initialState);

    return (
        <AppContext.Provider value={{ ...state, dispatch }}>
            {children}
        </AppContext.Provider>
    );
};
