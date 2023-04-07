import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';

const TableBody = ({ usersToShow, columnsInfo }) => {
    const renderContent = (user, column) => {
        if (columnsInfo[column].component) {
            const component = columnsInfo[column].component;
            if (typeof component === 'function') {
                return component(user);
            }
            return component;
        }
        return _.get(user, columnsInfo[column].iter);
    };

    return (
        <tbody>

        {usersToShow.map((user) => (
                <tr key = {user._id}>
                    {Object.keys(columnsInfo).map((column) => (
                        <td key = {column}>
                            {renderContent(user, column)}
                        </td>
                    ))
                    }
                </tr>
        ))
        }
        </tbody>
    );
    };

TableBody.propTypes = {
    usersToShow: PropTypes.array.isRequired,
    columnsInfo: PropTypes.object.isRequired
};

export default TableBody;
