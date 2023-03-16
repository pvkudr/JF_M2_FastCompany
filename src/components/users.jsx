import React from "react";
import User from "./user";
import 'bootstrap/dist/css/bootstrap.css';

const Users = ({users, onDelete, bookmarkInfo, bookmarkChange})=> {

    const renderTableHead = () => {
        return (
            <thead>
                <tr>
                    <th scope="col">Имя</th>
                    <th scope="col">Качества</th>
                    <th scope="col">Профессия</th>
                    <th scope="col">Встретился, раз</th>
                    <th scope="col">Оценка</th>
                    <th scope="col">Избранное</th>
                    <th scope="col"> </th>
                </tr>
            </thead>
        )
    }

    const renderTablesUserInfo = () => {
        return (users.map((user, index) =>(
            <User
                key = {user._id}
                user={user}
                onDelete = {onDelete}
                bookmarkInfo = {bookmarkInfo[index]}
                bookmarkChange = {bookmarkChange}
            />
            )
        ))
    }

    const renderTableFinal = () => {
        return (
            <table className="table">
                {renderTableHead()}
                <tbody>
                   {renderTablesUserInfo()}
                </tbody>
            </table>
        )
    }

    return (
        <>
            {users.length !== 0 ? renderTableFinal() : null}
        </>
    )
}

export default Users