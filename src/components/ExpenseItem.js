import React, { useContext } from 'react';
import { TiDelete } from 'react-icons/ti';
import { AiOutlinePlus, AiOutlineMinus } from 'react-icons/ai'; // Импорт иконок для плюса и минуса
import { AppContext } from '../context/AppContext';
import styles from './ExpenseItem.module.css';


const ExpenseItem = (props) => {
    const { dispatch, expenses } = useContext(AppContext);

    const handleDeleteExpense = () => {
        dispatch({
            type: 'DELETE_EXPENSE',
            payload: props.id,
        });
    };

    const increaseAllocation = (name) => {
        const expense = {
            name: name,
            cost: 10,
        };

        dispatch({
            type: 'ADD_EXPENSE',
            payload: expense
        });
    };

    const decreaseAllocation = (name) => {
        const expense = expenses.find(exp => exp.name === name);
        if (expense.cost - 10 < 0) {
            alert("Expense cannot be negative");
            return;
        }

        const newExpense = {
            name: name,
            cost: 10,
        };

        dispatch({
            type: 'RED_EXPENSE',
            payload: newExpense
        });
    };

    return (
        <tr>
            <td>{props.name}</td>
            <td>{props.currency}{props.cost}</td>
            <td>
                <button className={styles.increaseButton} onClick={() => increaseAllocation(props.name)}>
                    <AiOutlinePlus size='1.5em' color='white' />
                </button>
            </td>
            <td>
                <button className={styles.decreaseButton} onClick={() => decreaseAllocation(props.name)}>
                    <AiOutlineMinus size='1.5em' color='white' />
                </button>
            </td>
            <td>
                <TiDelete size='1.5em' onClick={handleDeleteExpense} />
            </td>
        </tr>
    );
};

export default ExpenseItem;
