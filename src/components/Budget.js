import React, { useContext, useState } from 'react';
import { AppContext } from '../context/AppContext';

const Budget = () => {
    const { budget, expenses, dispatch } = useContext(AppContext);
    const [newBudget, setNewBudget] = useState(budget);

    const handleBudgetChange = (event) => {
        setNewBudget(parseInt(event.target.value));
    }

    const handleSubmit = () => {
        if (newBudget < 0) {
            alert("You cannot reduce the budget value below zero");
            setNewBudget(budget); // Reset to current budget
            return;
        }

        const totalExpenses = expenses.reduce((total, item) => total + item.cost, 0);

        if (newBudget < totalExpenses) {
            alert("You cannot reduce the budget value lower than the total expenses");
            setNewBudget(budget); // Reset to current budget
            return;
        }

        if (newBudget > 20000) {
            alert("The value cannot exceed £20,000");
            setNewBudget(budget); // Reset to current budget
            return;
        }

        // Dispatch action to update budget in context
        dispatch({
            type: 'SET_BUDGET',
            payload: newBudget,
        });
    }

    return (
        <div className='alert alert-secondary'>
            <span>Budget: £</span>
            <input
                type="number"
                step="10"
                min="0"
                max="20000"
                value={newBudget}
                onChange={handleBudgetChange}
                onBlur={handleSubmit} // Handle submit on blur or add a submit button
            ></input>
        </div>
    );
};

export default Budget;
