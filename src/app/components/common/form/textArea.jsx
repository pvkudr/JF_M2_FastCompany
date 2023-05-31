import React from 'react';
import PropTypes from 'prop-types';

TextArea.propTypes = {
    name: PropTypes.string,
    rows: PropTypes.string,
    cols: PropTypes.string,
    placeholder: PropTypes.string,
    value: PropTypes.string,
    onChange: PropTypes.func,
    error: PropTypes.string
};

function TextArea({ name, rows, cols, value, onChange, placeholder, error }) {
    const handleChange = (e) => {
        const { name, value } = e.target;
        onChange({ name, value });
    };

    const getInputClasses = () => {
        return 'form-control' + (error ? ' is-invalid' : '');
    };

    return (
        <div className='mb-4'>
            <div className="input-group has-validation">
                <textarea
                    name = {name}
                    rows = {rows}
                    cols = {cols}
                    value = {value}
                    onChange = {handleChange}
                    className = {getInputClasses()}
                    placeholder={placeholder}
                />
                {error && <div className='invalid-feedback'> {error}</div>}
            </div>

        </div>

    );
};

export default TextArea;
