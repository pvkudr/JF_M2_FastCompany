import React from 'react';
import PropTypes from 'prop-types';

const TableHead = ({ currentSort, columnsInfo, onSort }) => {
    const caretDown = (<i className="bi bi-caret-down-fill"></i>);
    const caretUp = (<i className="bi bi-caret-up-fill"></i>);

    function Caret({ clickedItem }) {
        if (clickedItem === currentSort.iter) {
            if (clickedItem === 'name' || clickedItem === 'profession.name') {
                return (currentSort.order === 'desc' ? caretUp : caretDown);
            } else {
                return (currentSort.order === 'asc' ? caretUp : caretDown);
            }
        }
        return undefined;
    }

    const handleSort = (headerName) => {
        currentSort.iter === headerName
            ? onSort({ iter: headerName, order: currentSort.order === 'asc' ? 'desc' : 'asc' })
            : onSort({ iter: headerName, order: 'asc' });
    };
    return (
        <thead>
        <tr>
            {Object.keys(columnsInfo).map((column) => (
                <th
                    key = {column}
                    onClick={ columnsInfo[column].iter ? () => handleSort(columnsInfo[column].iter) : undefined }
                    scope='col'
                    {... { role: columnsInfo[column].iter && 'button' }}
                >
                    <span>
                        {columnsInfo[column].name}
                        <Caret
                            clickedItem={columnsInfo[column].iter}
                        />
                    </span>
                </th>
            ))
            }
        </tr>
        </thead>
    );
    };

TableHead.propTypes = {
    columnsInfo: PropTypes.object.isRequired,
    onSort: PropTypes.func.isRequired,
    currentSort: PropTypes.object.isRequired,
    clickedItem: PropTypes.string
};

export default TableHead;
