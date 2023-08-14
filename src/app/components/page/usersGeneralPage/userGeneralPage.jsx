import React, { useState, useEffect } from 'react';
import UsersTable from '../../ui/usersTable';
import SearchStatus from '../../ui/searchStatus';
import { PAGE_SIZE } from '../../../utils/constants';
import { paginate } from '../../../utils/paginate';
import GroupList from '../../common/groupList';
import Pagination from '../../common/pagination';
import ButtonClearAll from '../../ui/buttonClearAll';
import _ from 'lodash';
import SearchBar from '../../ui/searchBar';
import { searchFilter } from '../../../utils/searchFilter';
import { useUser } from '../../../hooks/useUsers';
import { useProfAndQual } from '../../../hooks/useProfAndQual';
import { useAuth } from '../../../hooks/useAuth';

function UserGeneralPage() {
    // FETCH THE DATA - users except current user
    const { currentUser } = useAuth();

    const fullUsers = useUser().users.filter((u) => u._id !== currentUser._id);
    const [users, setUsers] = useState(useUser().users.filter((u) => u._id !== currentUser._id));
    console.log('useGeneral_users', fullUsers);
    const [filteredUsers, setFilteredUsers] = useState(useUser().users.filter((u) => u._id !== currentUser._id));
    const { professions, isProfLoading } = (useProfAndQual());

    // useEffect(() => {
    //     // api.users.fetchAll().then((data) => setUsers(data));
    //     // setUsers(useUser());
    //     // api.professions.fetchAll().then((data) => setProfession(data));
    //     // api.users.fetchAll().then((data) => setFilteredUsers(data));
    // }, []);

    // FILTER
    const [currentPage, setCurrentPage] = useState(1);
    const [selectedProf, setSelectedProf] = useState();

    const handleProfessionSelect = (item) => {
        setSelectedProf(item);
        setFilteredUsers(users.filter((user) => user.profession === item._id));
        setCurrentPage(1);
        setSearchField('');
    };

    // CLEAR BUTTONS
    const clearFilter = () => {
        setSelectedProf();
        setFilteredUsers([...users]);
        setCurrentPage(1);
        setSearchField('');
    };
    const clearAll = () => {
        setSelectedProf();
        setUsers(fullUsers); // todo check
        setFilteredUsers(fullUsers); // todo check
        setCurrentPage(1);
        setSearchField('');
    };

    // DELETE
    // const handleDelete = (userId) => {
    //     setUsers((prevState) => prevState.filter((user) => user._id !== userId));
    //     setFilteredUsers((prevState) =>
    //         prevState.filter((user) => user._id !== userId)
    //     );
    // };

    // todo  - check if this useEffect is connected with delete

    useEffect(() => {
        if ((currentPage - 1) * PAGE_SIZE === filteredUsers.length && filteredUsers.length) {
            setCurrentPage((prevState) => prevState - 1);
        }
    }, [filteredUsers]);

    // SORT
    const [sortBy, setSortBy] = useState({ iter: 'name', clicked: false, order: 'asc' });
    const handleSort = (item) => {
        setSortBy(item);
    };

    useEffect(() => {
        setFilteredUsers(_.orderBy(filteredUsers, [sortBy.iter], [sortBy.order]));
        setUsers(_.orderBy(users, [sortBy.iter], [sortBy.order]));
    }, [sortBy]);

    // BOOKMARK
    const handleToggleBookMark = (userId) => {
        const newArr = [...filteredUsers];
        const clickedIndex = newArr.findIndex((element) => element._id === userId);
        newArr[clickedIndex].bookmark = !newArr[clickedIndex].bookmark;
        setFilteredUsers(newArr);
    };

    // PAGINATION
    const handlePageChange = (pageIndex) => { setCurrentPage(pageIndex); };

    // SEARCH
    const [searchField, setSearchField] = useState('');
    const handleSearchChange = (obj) => {
        const { value } = obj;
        setSearchField(value);
        setFilteredUsers(searchFilter(users, value));
        setSelectedProf();
        setCurrentPage(1);
    };

    // USERS TO SHOW

    const usersToShow = paginate(filteredUsers, currentPage, PAGE_SIZE);

    // ////////////////////
    if ((filteredUsers.length & !isProfLoading) || users.length) { // todo
        return (
            <>
                <div className='d-flex'>
                    {professions && (
                        <div className="d-flex flex-column flex-shrink-0 p-3">
                            <GroupList
                                items={professions}
                                onItemSelect={handleProfessionSelect}
                                selectedItem={selectedProf}
                                onClearButtonClick={clearFilter}
                            />
                            <ButtonClearAll
                                onClearAllButtonClick={clearAll}
                            />
                        </div>)
                    }
                    <div className="d-flex flex-column">
                        <SearchStatus length={filteredUsers.length}/>
                        <SearchBar
                            onChange = {handleSearchChange}
                            searchField = {searchField}
                        />
                        <UsersTable
                            usersToShow={usersToShow}
                            onToggleBookmark={handleToggleBookMark}
                            onSort={handleSort}
                            currentSort={sortBy}
                        />
                        <div className="d-flex justify-content-center">
                            <Pagination
                                itemsCount={filteredUsers.length}
                                pageSize={PAGE_SIZE}
                                onPageChange={handlePageChange}
                                currentPage={currentPage}
                            />
                        </div>
                    </div>
                </div>
            </>

        );
        } else return 'Loading...';
};

export default UserGeneralPage;