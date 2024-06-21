import React, { useContext, useState } from 'react';
import { AppContext } from '../context/AppContext';
import styles from './AllocationForm.module.css';

const AllocationForm = () => {
    const { dispatch, remaining, currency } = useContext(AppContext);

    const [name, setName] = useState('');
    const [cost, setCost] = useState('');
    const [action, setAction] = useState('');

    const handleNameChange = (event) => {
        setName(event.target.value);
    };

    const handleActionChange = (event) => {
        setAction(event.target.value);
    };

    const handleCostChange = (event) => {
        setCost(event.target.value);
    };

    const submitEvent = () => {
        if (cost === '') {
            alert('Please enter a cost.');
            return;
        }

        const expense = {
            name: name,
            cost: parseInt(cost),
        };

        if (action === "Reduce") {
            if (cost > remaining) {
                alert(`The value cannot exceed remaining funds ${currency}${remaining}`);
                return;
            }
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

        // Reset form after submission
        setName('');
        setCost('');
        setAction('');
    };

    return (
        <div>
            <div className='row'>
                <div className="input-group mb-3" style={{ marginLeft: '2rem' }}>
                    <div className="input-group-prepend">
                        <label className="input-group-text" htmlFor="inputGroupSelect01">Department</label>
                    </div>
                    <select className="custom-select" id="inputGroupSelect01" value={name} onChange={handleNameChange}>
                        <option value="">Choose...</option>
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
                    <select className="custom-select" id="inputGroupSelect02" value={action} onChange={handleActionChange}>
                        <option value="Add">Add</option>
                        <option value="Reduce">Reduce</option>
                    </select>

                    <span className={styles.currency}>{currency}</span>

                    <input
                        required
                        type='number'
                        id='cost'
                        value={cost}
                        style={{ marginLeft: '1rem', size: 10 }}
                        onChange={handleCostChange}
                    />

                    <button className="btn btn-primary" onClick={submitEvent} style={{ marginLeft: '2rem' }}>
                        Save
                    </button>
                </div>
            </div>
        </div>
    );
};

export default AllocationForm;
