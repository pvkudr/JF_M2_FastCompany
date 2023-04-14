import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import PropTypes from 'prop-types';
import BookMark from './bookmark';
import Qualities from './qualities';
import Table from './table';
import { Link } from 'react-router-dom';

const UsersTable = ({ usersToShow, onDelete, onToggleBookmark, onSort, currentSort }) => {
     const columnsInfo = {
        name: {
            iter: 'name',
            name: 'Имя',
            component: (user) => {
                const userLink = '/users/' + user._id;
                return (<Link to={userLink}>{user.name}</Link>);
            }
        },
        qualities: {
            name: 'Качества',
            component: (user) =>
                (<Qualities
                    qualities={user.qualities}
                />)
        },
        profession: { iter: 'profession.name', name: 'Профессия' },
        completedMeetings: { iter: 'completedMeetings', name: 'Встретился, раз' },
        rate: { iter: 'rate', name: 'Оценка' },
        bookmark: {
            iter: 'bookmark',
            name: 'Избранное',
            component: (user) =>
                (<BookMark
                    status={user.bookmark}
                    onClick={() => onToggleBookmark(user._id)}
                />)
        },
        delete: {
            component: (user) =>
                (<button className='btn btn-danger' onClick={() => onDelete(user._id)}>
                    delete
                </button>)
        }
    };
        return (
            <Table
                currentSort={currentSort}
                columnsInfo={columnsInfo}
                onSort={onSort}
                onDelete={onDelete}
                onToggleBookmark={onToggleBookmark}
                usersToShow={usersToShow}
            >
            </Table>
        );
    };

UsersTable.propTypes = {
    usersToShow: PropTypes.array.isRequired,
    onDelete: PropTypes.func.isRequired,
    onToggleBookmark: PropTypes.func.isRequired,
    onSort: PropTypes.func.isRequired,
    currentSort: PropTypes.object.isRequired
};

export default UsersTable;
