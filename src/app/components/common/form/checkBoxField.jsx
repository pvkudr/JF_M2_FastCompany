import React from 'react';
import PropTypes from 'prop-types';

const CheckBoxField = ({
    label,
    name,
    value,
    onChange,
    error,
    children
}) => {
    const getInputClasses = () => {
        return 'form-check-input' + (error ? ' is-invalid' : '');
    };
    const handleChange = () => {
        const n = name;
        onChange({ name: n, value: !value });
    };

    return (
        <div className="mb-4">
            <div className="form-check">
                <input
                    type="checkbox" value=""
                    id={name}
                    onChange={handleChange}
                    checked = {value}
                    className = {getInputClasses()}
                >
                </input>
                    <label className="form-check-label" htmlFor={name}>
                        {children}
                    </label>
                {error && <div className='invalid-feedback'> {error}</div>}
            </div>
        </div>

    );
};

CheckBoxField.propTypes = {
    name: PropTypes.string,
    label: PropTypes.string,
    value: PropTypes.bool,
    onChange: PropTypes.func,
    options: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
    children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]),
    error: PropTypes.string
};

export default CheckBoxField;
