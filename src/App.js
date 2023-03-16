import React, {useState} from "react";
import Users from './components/users'
import SearchStatus from './components/searchStatus'
import api from '../src/api'


function App () {
    const [users, setUsers] = useState(api.users.fetchAll())
    // new array with id and bookmark
    const [bookmarkInfo, setBookmark] = useState(users.map((user) => {
        let _id = user._id
        let bookmark = user.bookmark
        return {_id, bookmark}
    }))

    const handleDelete = (userId) => {
        setUsers(prevState => prevState.filter(user => user._id !== userId))
        setBookmark(prevState => prevState.filter(user => user._id !== userId))
    }

    const handleToggleBookMark = (userId) => {
        const newArr = [...bookmarkInfo]
        const clickedIndex = newArr.findIndex((element) => {
            return element._id === userId
        })
        newArr[clickedIndex].bookmark = !newArr[clickedIndex].bookmark
        setBookmark(newArr)
    }

        return (
            <>
                <SearchStatus
                    length={users.length}
                />
                <Users
                    users={users}
                    onDelete={handleDelete}
                    bookmarkInfo={bookmarkInfo}
                    bookmarkChange={handleToggleBookMark}
                />
            </>
        )
}

export default App