import React, { useContext } from 'react';
import { AppContext } from '../context/AppContext';

const CurrencySelector = () => {
    const { dispatch } = useContext(AppContext);

    const handleCurrencyChange = (event) => {
        const selectedCurrency = event.target.value;
        dispatch({
            type: 'CHG_CURRENCY',
            payload: selectedCurrency,
        });
    };

    return (
        <div className='alert alert-secondary'>
            <span>Select Currency: </span>
            <select defaultValue='£' onChange={handleCurrencyChange}>
                <option value='£'>£ (Pound)</option>
                <option value='₹'>₹ (Rupee)</option>
                <option value='€'>€ (Euro)</option>
                <option value='$'>$ (Dollar)</option>
            </select>
        </div>
    );
};

export default CurrencySelector;
