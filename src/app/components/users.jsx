import React from 'react';
import User from './user';
import 'bootstrap/dist/css/bootstrap.css';
import Pagination from './pagination';
import { paginate } from '../utils/paginate';
import PropTypes from 'prop-types';
import { PAGE_SIZE } from '../utils/constants';

const Users = ({ users, onDelete, onToggleBookmark, currentPage, onPageChange }) => {
    const userNumber = users.length;

    const userCrop = paginate(users, currentPage, PAGE_SIZE);

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
            {userNumber > 0 && renderTableFinal()}
            <Pagination
                itemsCount={userNumber}
                pageSize={PAGE_SIZE}
                onPageChange={onPageChange}
                currentPage={currentPage}
            />
        </>
    );
};

Users.propTypes = {
    users: PropTypes.array.isRequired,
    onDelete: PropTypes.func.isRequired,
    onToggleBookmark: PropTypes.func.isRequired,
    currentPage: PropTypes.number.isRequired,
    onPageChange: PropTypes.func.isRequired
};

export default Users;
