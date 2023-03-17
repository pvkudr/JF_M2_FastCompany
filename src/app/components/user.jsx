import React from "react";
import Quality from './qualitie'
import BookMark from './bookmark'

const User = ({user, onDelete, onToggleBookmark}) =>{

    return (
        <tr>
            <td> {user.name} </td>
            <td> { Quality(user.qualities)} </td>
            <td> {user.profession.name}</td>
            <td> {user.completedMeetings}</td>
            <td> {user.rate} / 5</td>
            <td>
                <BookMark
                    status = {user.bookmark}
                    onClick = {() => onToggleBookmark(user._id)}
                />
            </td>
            <td>
                <button
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

