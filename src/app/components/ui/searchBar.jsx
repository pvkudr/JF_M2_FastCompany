import React from 'react';
import PropTypes from 'prop-types';
import TextField from '../common/form/textField';

const SearchBar = ({ onChange, searchField }) => {
    return (
        <form >
            <TextField
                label = ''
                name = 'search'
                value = {searchField}
                onChange = {onChange}
                placeholder = 'Search..'
            />
        </form>
    );
};
TextField.defaultProps = {
    type: 'text'
};

SearchBar.propTypes = {
    searchField: PropTypes.string,
    type: PropTypes.string,
    name: PropTypes.string,
    value: PropTypes.string,
    onChange: PropTypes.func,
    error: PropTypes.string
};

export default SearchBar;
