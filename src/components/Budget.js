import React, { useContext, useState, useEffect } from 'react';
import { AppContext } from '../context/AppContext';

const Budget = () => {
    const { budget, dispatch, currency } = useContext(AppContext);
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

    useEffect(() => {
        setNewBudget(budget); // Update newBudget when budget changes
    }, [budget]);

    return (
        <div className='alert alert-secondary'>
            <span>Budget: {currency} </span>
            <input
                type="number"
                step="10"
                min="0"
                max="20000"
                value={newBudget}
                onChange={handleBudgetChange}
                onBlur={handleSubmit}
            ></input>
        </div>
    );
};

export default Budget;
