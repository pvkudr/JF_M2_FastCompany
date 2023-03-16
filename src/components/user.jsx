import React from "react";
import Quality from './qualitie'
import BookMark from './bookmark'

const User = ({user, onDelete, bookmarkInfo, bookmarkChange}) =>{


    return (
        <tr key={user._id}>
            <td> {user.name} </td>
            <td> { Quality(user.qualities)} </td>
            <td> {user.profession.name}</td>
            <td> {user.completedMeetings}</td>
            <td> {user.rate}</td>
            <td>
                <BookMark
                    bookmarkInfo = {bookmarkInfo}
                    onClick = {bookmarkChange}
                />
            </td>
            <td>
                <button
                    id = {user._id}
                    type="button"
                    className="btn btn-danger"
                    onClick={() => onDelete(user._id)}
                >
                    delete
                </button>
            </td>
        </tr>
        )
}

export default User

