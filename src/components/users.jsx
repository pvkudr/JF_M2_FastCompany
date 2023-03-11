import React, {useState} from "react";
import 'bootstrap/dist/css/bootstrap.css';
import api from '../api'

const Users = ()=> {
    const [users, setUsers] = useState (api.users.fetchAll())

    const handleDelete = (event) => {
        const clickedUserId = event.target.id
        setUsers(prevState => prevState.filter(user => user._id!==clickedUserId))
    }
    const renderPhrase = (number) => {
        const str = String(number)
        const lastNumber = str.charAt(str.length-1)
        const lastSecondNumber = str.charAt(str.length-2)
        if (number === 0) {
            return <h1><span className="badge bg-danger"> Никто с тобой не тусанет</span></h1>
        }
        if (['2', '3', '4'].includes(lastNumber) && lastSecondNumber !=='1' )  {
            return <h1><span className="badge bg-primary"> {number} человека тусанут с тобой сегодня</span></h1>
        } else {
            return <h1> <span className="badge bg-primary">{number} человек тусанет с тобой сегодня</span></h1>
        }
    }

    const renderTablesUserInfo = () => {
        return users.map((user, index) =>(
            <tr>
                <td key='0' className = ''> {user.name} </td>
                <td key='1' className = ''> { renderQualities(user.qualities)} </td>
                <td key= '2'> {user.profession.name}</td>
                <td key= '3'> {user.completedMeetings}</td>
                <td key= '4'> {user.rate}</td>
                <td key='5'>
                    <button
                    id = {user._id}
                    type="button"
                    className="btn btn-danger"
                    onClick={handleDelete}
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
                    <th scope="col" key = '00'> Имя </th>
                    <th scope="col" key = '02'>Качества</th>
                    <th scope="col" key = '03'>Профессия</th>
                    <th scope="col" key = '04'>Встретился, раз</th>
                    <th scope="col" key = '05'>Оценка</th>
                    <th scope="col" key = '06'> </th>
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
            {users.length !== 0 ? renderTableFinal() : ''}
        </>
    )
}

export default Users