import React from 'react';
import PropTypes from 'prop-types';

const GroupList = ({
    items,
    onItemSelect,
    valueProperty,
    contentProperty,
    selectedItem
}) => {
    const itemsToArray = Array.isArray(items) ? [...items] : Object.values(items);

    return (
        <ul className='list-group'>
            {itemsToArray.map((item) => (
                <li
                    className={
                        'list-group-item' + (item === selectedItem ? ' active' : '')
                    }
                    key={item[valueProperty]}
                    onClick={() => onItemSelect(item)}
                    role='button'
                >
                    {item[contentProperty]}
                </li>
            ))}
        </ul>
    );
};

GroupList.defaultProps = {
    valueProperty: '_id',
    contentProperty: 'name'
};

GroupList.propTypes = {
    items: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
    valueProperty: PropTypes.string.isRequired,
    contentProperty: PropTypes.string.isRequired,
    onItemSelect: PropTypes.func,
    selectedItem: PropTypes.object
};

export default GroupList;
