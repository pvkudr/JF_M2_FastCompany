import React, { useState } from 'react';
import Users from './components/users';
import SearchStatus from './components/searchStatus';
import api from './api';

function App() {
    const [users, setUsers] = useState(api.users.fetchAll());

    const handleDelete = (userId) => {
        setUsers((prevState) => prevState.filter((user) => user._id !== userId));
    };

    const handleToggleBookMark = (userId) => {
        const newArr = [...users];
        const clickedIndex = newArr.findIndex((element) => element._id === userId);
        newArr[clickedIndex].bookmark = !newArr[clickedIndex].bookmark;
        setUsers(newArr);
    };

    return (
        <div>
            <SearchStatus length={users.length} />
            <Users
                users={users}
                onDelete={handleDelete}
                onToggleBookmark={handleToggleBookMark}
            />
        </div>
    );
}

export default App;
