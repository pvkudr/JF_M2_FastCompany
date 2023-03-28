import React from 'react';
import User from './user';
import 'bootstrap/dist/css/bootstrap.css';
import PropTypes from 'prop-types';

const Users = ({ userCrop, onDelete, onToggleBookmark }) => {
    const renderTableHead = () => {
        return (
            <thead>
                <tr>
                    <th scope='col'>Имя</th>
                    <th scope='col'>Качества</th>
                    <th scope='col'>Профессия</th>
                    <th scope='col'>Встретился, раз</th>
                    <th scope='col'>Оценка</th>
                    <th scope='col'>Избранное</th>
                    <th scope='col'> </th>
                </tr>
            </thead>
        );
    };

    const renderTablesUserInfo = () => {
        return userCrop.map((user) => (
            <User
                key={user._id}
                user={user}
                onDelete={onDelete}
                onToggleBookmark={onToggleBookmark}
            />
        ));
    };

    const renderTableFinal = () => {
        return (
            <table className='table'>
                {renderTableHead()}
                <tbody>{renderTablesUserInfo()}</tbody>
            </table>
        );
    };

    return (
        <>
            {userCrop.length > 0 && renderTableFinal()}
        </>);
};

Users.propTypes = {
    userCrop: PropTypes.array.isRequired,
    onDelete: PropTypes.func.isRequired,
    onToggleBookmark: PropTypes.func.isRequired
};

export default Users;
