import React from 'react';
import { useAuth } from '../../hooks/useAuth';
import { Redirect, Route } from 'react-router-dom';
import PropTypes from 'prop-types';

const ProtectedRoute = ({ component: Component, children, ...rest }) => {
    const { currentUser } = useAuth();
    // console.log('protectedRoute');
    // console.log('component', Component);
    // console.log('children', children);
    // console.log('rest', rest);

    return (
        < Route{...rest} render = {(props) => {
            console.log('props', props);
            if (!currentUser) {
                return <Redirect
                    to ={{
                        pathname: '/login',
                        state: {
                            from: props.location
                        }
                    }} />;
            }
            return Component ? <Component {...props} /> : children;
        }}/>
    );
};

ProtectedRoute.propTypes = {
    children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.node),
        PropTypes.node
    ]),
    component: PropTypes.func,
    location: PropTypes.object
};

export default ProtectedRoute;
