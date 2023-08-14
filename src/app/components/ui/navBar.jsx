import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import NavProfile from './navProfile';

const NavBar = () => {
    const { currentUser } = useAuth();
    // console.log('user_navbar', currentUser);
    return (
        <nav className='navbar bg-light mb-3'>
            <div className="container-fluid">
                <ul className="nav">
                    <li className="nav-item">
                        <Link className="nav-link" aria-current="page" to="/">Main</Link>
                    </li>
                    {currentUser && (
                        <li className="nav-item">
                            <Link className="nav-link" aria-current="page" to="/users">Users</Link>
                        </li>
                    )}
                </ul>
                <div className="d-flex">
                    {currentUser
                        ? <NavProfile/>
                        : (<Link className="nav-link" aria-current="page" to="/login">Login</Link>)
                    }

                </div>

            </div>
        </nav>
    );
};
// NavBar.propTypes = {
//     onClearAllButtonClick: PropTypes.func.isRequired
// };

export default NavBar;
