import React from 'react';
import { Link } from 'react-router-dom';
// import PropTypes from 'prop-types';

const NavBar = () => {
    return (
        <ul className="nav">
            <li className="nav-item">
                <Link className="nav-link" to="/">Main</Link>
                {/* <a className="nav-link active" aria-current="page" href="/">Main</a> */}
            </li>
            <li className="nav-item">
                <Link className="nav-link" to="/login">Login</Link>
                {/* <a className="nav-link" href="/login">Login</a> */}
            </li>
            <li className="nav-item">
                <Link className="nav-link" to="/users">Users</Link>
                {/* <a className="nav-link" href="/users">Users</a> */}
            </li>
        </ul>
    );
};
// NavBar.propTypes = {
//     onClearAllButtonClick: PropTypes.func.isRequired
// };

export default NavBar;
