import React, { useState, useEffect } from 'react';
import Users from './components/users';
import SearchStatus from './components/searchStatus';
import api from './api';
import { PAGE_SIZE } from './utils/constants';

function App() {
    const [users, setUsers] = useState(api.users.fetchAll());
    const [currentPage, setCurrentPage] = useState(1);

    const handleDelete = (userId) => {
        setUsers((prevState) => prevState.filter((user) => user._id !== userId));
    };
    useEffect(() => {
        if ((currentPage - 1) * PAGE_SIZE === users.length) {
            setCurrentPage(prevState => prevState - 1);
        }
    }, [users]
    );

    const handleToggleBookMark = (userId) => {
        const newArr = [...users];
        const clickedIndex = newArr.findIndex((element) => element._id === userId);
        newArr[clickedIndex].bookmark = !newArr[clickedIndex].bookmark;
        setUsers(newArr);
    };

    const handlePageChange = (pageIndex) => {
        setCurrentPage(pageIndex);
    };

    return (
        <div>
            <SearchStatus length={users.length} />
            <Users
                users={users}
                onDelete={handleDelete}
                onToggleBookmark={handleToggleBookMark}
                currentPage = {currentPage}
                onPageChange={handlePageChange}
            />
        </div>
    );
}

export default App;
