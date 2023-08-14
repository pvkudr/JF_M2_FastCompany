import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import PropTypes from 'prop-types';
import BookMark from '../common/bookmark';
import Qualities from './qualities/';
import Table from '../common/table/';
import { Link } from 'react-router-dom';
import Profession from './profession';

const UsersTable = ({ usersToShow, onToggleBookmark, onSort, currentSort }) => {
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
        profession: {
            name: 'Профессия',
            component: (user) =>
                (<Profession
                    id={user.profession}
                />)
        },
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
        }

    };
        return (
            <Table
                currentSort={currentSort}
                columnsInfo={columnsInfo}
                onSort={onSort}
                onToggleBookmark={onToggleBookmark}
                usersToShow={usersToShow}
            >
            </Table>
        );
    };

UsersTable.propTypes = {
    usersToShow: PropTypes.array.isRequired,
    onToggleBookmark: PropTypes.func.isRequired,
    onSort: PropTypes.func.isRequired,
    currentSort: PropTypes.object.isRequired
};

export default UsersTable;
