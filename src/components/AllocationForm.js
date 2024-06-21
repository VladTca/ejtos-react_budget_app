import React, { useContext, useState } from 'react';
import { AppContext } from '../context/AppContext';
import styles from './AllocationForm.module.css';

const AllocationForm = () => {
    const { dispatch, remaining, currency } = useContext(AppContext);

    const [name, setName] = useState('');
    const [cost, setCost] = useState('');
    const [action, setAction] = useState('');

    const submitEvent = () => {
        // Validate cost input
        const parsedCost = parseInt(cost);
        if (isNaN(parsedCost) || parsedCost <= 0) {
            alert('Please enter a valid positive number for cost.');
            return;
        }

        // Validate remaining budget
        if (remaining <= 0) {
            alert(`The remaining budget cannot be less than or equal to 0.`);
            return;
        }

        // Validate if cost exceeds remaining
        if (parsedCost > remaining) {
            alert(`The value cannot exceed remaining funds ${currency}${remaining}`);
            setCost(""); // Clear input field
            return;
        }

        const expense = {
            name: name,
            cost: parsedCost,
        };

        if (action === "Reduce") {
            dispatch({
                type: 'RED_EXPENSE',
                payload: expense,
            });
        } else {
            dispatch({
                type: 'ADD_EXPENSE',
                payload: expense,
            });
        }
    };

    return (
        <div>
            <div className='row'>
                <div className="input-group mb-3" style={{ marginLeft: '2rem' }}>
                    <div className="input-group-prepend">
                        <label className="input-group-text" htmlFor="inputGroupSelect01">Department</label>
                    </div>
                    <select className="custom-select" id="inputGroupSelect01" onChange={(event) => setName(event.target.value)}>
                        <option defaultValue>Choose...</option>
                        <option value="Marketing">Marketing</option>
                        <option value="Sales">Sales</option>
                        <option value="Finance">Finance</option>
                        <option value="HR">HR</option>
                        <option value="IT">IT</option>
                        <option value="Admin">Admin</option>
                    </select>

                    <div className="input-group-prepend" style={{ marginLeft: '2rem' }}>
                        <label className="input-group-text" htmlFor="inputGroupSelect02">Allocation</label>
                    </div>
                    <select className="custom-select" id="inputGroupSelect02" onChange={(event) => setAction(event.target.value)}>
                        <option defaultValue value="Add">Add</option>
                        <option value="Reduce">Reduce</option>
                    </select>

                    <div style={{ display: 'flex', alignItems: 'center' }}>
                        <span className={styles['currency-symbol']}>{currency}</span>
                        <input
                            required='required'
                            type='number'
                            id='cost'
                            value={cost}
                            style={{ marginLeft: '10px', width: '80px' }}
                            onChange={(event) => setCost(event.target.value)}>
                        </input>
                    </div>

                    <button className="btn btn-primary" onClick={submitEvent} style={{ marginLeft: '2rem' }}>
                        Save
                    </button>
                </div>
            </div>
        </div>
    );
};

export default AllocationForm;
