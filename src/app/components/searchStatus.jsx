import React from 'react';
import PropTypes from 'prop-types';

const SearchStatus = ({ length }) => {
    const str = String(length);
    const lastNumber = str.charAt(str.length - 1);
    const lastSecondNumber = str.charAt(str.length - 2);
    if (length === 0) {
        return (
            <h1>
                <span className='badge bg-danger'> Никто с тобой не тусанет</span>
            </h1>
        );
    }
    if (['2', '3', '4'].includes(lastNumber) && lastSecondNumber !== '1') {
        return (
            <h2>
                <span className='badge bg-primary'>
                    {' '}
                    {length} человека тусанут с тобой сегодня
                </span>
            </h2>
        );
    } else {
        return (
            <h2>
                {' '}
                <span className='badge bg-primary'>
                    {length} человек тусанет с тобой сегодня
                </span>
            </h2>
        );
    }
};

SearchStatus.propTypes = {
    length: PropTypes.number.isRequired
};

export default SearchStatus;
