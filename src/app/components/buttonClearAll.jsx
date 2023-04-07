import React from 'react';
import PropTypes from 'prop-types';

const ButtonClearAll = ({ onClearAllButtonClick }) => {
    return (
        <button
            className='btn btn-secondary mt-2 mr-2'
            onClick={onClearAllButtonClick}
        >
            Очистить все
        </button>
    );
    };
ButtonClearAll.propTypes = {
    onClearAllButtonClick: PropTypes.func.isRequired
};

export default ButtonClearAll;
