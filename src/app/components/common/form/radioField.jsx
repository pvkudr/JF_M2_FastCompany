import React from 'react';
import PropTypes from 'prop-types';

const RadoiField = ({ options, name, onChange, value, label }) => {
    const handleChange = (e) => {
        const { name, value } = e.target;
        onChange({ name, value });
    };

    return (
        <div className="mb-4">
            <label className='form-label'>
                {label}
            </label>
            <div>
                {options.map((option) => (
                    <div
                        key = {option.name + '_' + option.value}
                        className="form-check form-check-inline"
                    >
                        <input
                            className="form-check-input"
                            type="radio"
                            name={name}
                            id={option.name + '_' + option.value}
                            checked = {option.value === value}
                            value={option.value}
                            onChange={handleChange}
                        />
                        <label
                            className="form-check-label"
                            htmlFor={option.name + '_' + option.value}>
                            {option.name}
                        </label>
                    </div>
                ))}
            </div>

        </div>
    );
};
RadoiField.propTypes = {
    label: PropTypes.string,
    value: PropTypes.string,
    name: PropTypes.string,
    onChange: PropTypes.func,
    options: PropTypes.array

};

export default RadoiField;
