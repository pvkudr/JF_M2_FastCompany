import React, { useState, useEffect } from 'react';
import Users from './components/users';
import SearchStatus from './components/searchStatus';
import api from './api';
import { PAGE_SIZE } from './utils/constants';
import { paginate } from './utils/paginate';
import GroupList from './components/groupList';
import Pagination from './components/pagination';

function App() {
    // FETCH THE DATA
    const [users, setUsers] = useState([]);
    const [filteredUsers, setFilteredUsers] = useState([]);
    const [professions, setProfession] = useState();

    useEffect(() => {
        api.users.fetchAll().then((data) => setUsers(data));
        api.professions.fetchAll().then((data) => setProfession(data));
        api.users.fetchAll().then((data) => setFilteredUsers(data));
    }, []);

    // FILTER
    const [currentPage, setCurrentPage] = useState(1);
    const [selectedProf, setSelectedProf] = useState();

    const handleProfessionSelect = (item) => {
        setSelectedProf(item);
        setFilteredUsers(users.filter((user) => user.profession.name === item.name));
        setCurrentPage(1);
    };

    // CLEAR BUTTONS
    const clearFilter = () => {
        setSelectedProf();
        setFilteredUsers([...users]);
        setCurrentPage(1);
    };
    const clearAll = () => {
        setSelectedProf();
        api.users.fetchAll().then((data) => setUsers(data));
        api.users.fetchAll().then((data) => setFilteredUsers(data));
        setCurrentPage(1);
    };

    // DELETE
    const handleDelete = (userId) => {
        setUsers((prevState) => prevState.filter((user) => user._id !== userId));
        setFilteredUsers((prevState) =>
            prevState.filter((user) => user._id !== userId)
        );
    };

    useEffect(() => {
        if ((currentPage - 1) * PAGE_SIZE === filteredUsers.length && filteredUsers.length) {
            setCurrentPage((prevState) => prevState - 1);
        }
    }, [filteredUsers]);

    // BOOKMARK
    const handleToggleBookMark = (userId) => {
        const newArr = [...users];
        const clickedIndex = newArr.findIndex((element) => element._id === userId);
        newArr[clickedIndex].bookmark = !newArr[clickedIndex].bookmark;
        setUsers(newArr);
    };

    // PAGINATION
    const handlePageChange = (pageIndex) => { setCurrentPage(pageIndex); };
    const userCrop = paginate(filteredUsers, currentPage, PAGE_SIZE);

    return (
        <div className = 'd-flex'>
            {professions && (
                <div className="d-flex flex-column flex-shrink-0 p-3">
                    <GroupList
                        items={professions}
                        onItemSelect={handleProfessionSelect}
                        selectedItem={selectedProf}
                    />
                    <button className='btn btn-secondary mt-2 mr-2' onClick={clearFilter}>
                        Очистить фильтр
                    </button>
                    <button className='btn btn-secondary mt-2' onClick={clearAll}>
                        Очистить все
                    </button>
                </div>)
            }
            <div className="d-flex flex-column">
                <SearchStatus length={filteredUsers.length} />
                <Users
                    userCrop={userCrop}
                    onDelete={handleDelete}
                    onToggleBookmark={handleToggleBookMark}
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
    );
};

export default App;
