import React, {useState} from "react";
import 'bootstrap/dist/css/bootstrap.css';
import api from '../api'

const Users = ()=> {
    const [users, setUsers] = useState (api.users.fetchAll())

    const handleDelete = (userId) => {
        setUsers(prevState => prevState.filter(user => user._id !== userId))
    }
    const renderPhrase = (number) => {
        const str = String(number)
        const lastNumber = str.charAt(str.length-1)
        const lastSecondNumber = str.charAt(str.length-2)
        if (number === 0) {
            return <h1><span className="badge bg-danger"> Никто с тобой не тусанет</span></h1>
        }
        if (['2', '3', '4'].includes(lastNumber) && lastSecondNumber !=='1' )  {
            return <h2><span className="badge bg-primary"> {number} человека тусанут с тобой сегодня</span></h2>
        } else {
            return <h2> <span className="badge bg-primary">{number} человек тусанет с тобой сегодня</span></h2>
        }
    }

    const renderTablesUserInfo = () => {
        return users.map((user) =>(
            <tr key={user._id}>
                <td> {user.name} </td>
                <td> { renderQualities(user.qualities)} </td>
                <td> {user.profession.name}</td>
                <td> {user.completedMeetings}</td>
                <td> {user.rate}</td>
                <td>
                    <button
                    id = {user._id}
                    type="button"
                    className="btn btn-danger"
                    onClick={() => handleDelete(user._id)}
                    >
                        delete
                    </button>
                </td>
            </tr>
            )
        )
    }

    const renderQualities = function (qualities) {
        return qualities.map ( (item) => (
            <span
                className={'m-2 badge bg-' + item.color}
                key={item._id}
            >
                {item.name}
            </span>)
        )
    }

    const renderTableFinal = () => {

        return (
            <table className="table">
                <thead>
                <tr>
                    <th scope="col">Имя</th>
                    <th scope="col">Качества</th>
                    <th scope="col">Профессия</th>
                    <th scope="col">Встретился, раз</th>
                    <th scope="col">Оценка</th>
                    <th scope="col"> </th>
                </tr>
                </thead>
                <tbody>
                   {renderTablesUserInfo()}
                </tbody>
            </table>
        )
    }

    return (
        <>
            {renderPhrase(users.length)}
            {users.length !== 0 ? renderTableFinal() : null}
        </>
    )
}

export default Users