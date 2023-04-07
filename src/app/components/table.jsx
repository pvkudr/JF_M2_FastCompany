import React from 'react';
import TableHead from './tableHead';
import TableBody from './tableBody';
import PropTypes from 'prop-types';

const Table = ({ usersToShow, currentSort, columnsInfo, onSort, children }) => {
    return (
        <table className='table'>
            {children ||
                (<>
                    <TableHead
                        currentSort={currentSort}
                        columnsInfo = {columnsInfo}
                        onSort = {onSort}
                    />
                    <TableBody
                        usersToShow={usersToShow }
                        columnsInfo = {columnsInfo}

                    />
                </>)
            }
        </table>

    );
};

Table.propTypes = {
    usersToShow: PropTypes.array,
    onSort: PropTypes.func,
    currentSort: PropTypes.object,
    columnsInfo: PropTypes.object,
    children: PropTypes.array

};

export default Table;
