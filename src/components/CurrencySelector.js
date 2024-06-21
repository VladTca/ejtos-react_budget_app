import React, { useContext } from 'react';
import { AppContext } from '../context/AppContext';

const CurrencySelector = () => {
    const { dispatch } = useContext(AppContext);

    const handleCurrencyChange = (event) => {
        const selectedCurrency = event.target.value;
        dispatch({
            type: 'CHANGE_CURRENCY',
            payload: selectedCurrency,
        });
    };

    return (
        <div className='alert alert-secondary'>
            <span>Select Currency: </span>
            <select defaultValue='£' onChange={handleCurrencyChange}>
                <option value='£'>£ (UK)</option>
                <option value='₹'>₹ (India)</option>
                <option value='€'>€ (Europe)</option>
                <option value='CAD'>CAD (Canada)</option>
            </select>
        </div>
    );
};

export default CurrencySelector;
