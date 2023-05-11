import React from 'react';
import PropTypes from 'prop-types';

const SelectField = ({
    label,
    name,
    value,
    onChange,
    defaultOption,
    options,
    error
}) => {
    const getInputClasses = () => {
        return 'form-select' + (error ? ' is-invalid' : '');
    };
    const optionsToArray = Array.isArray(options) && typeof options === 'object'
        ? [...options]
        : Object.values(options);

    const handleChange = (e) => {
        const { name, value } = e.target;
        onChange({ name, value });
    };

    return (
        <div className="mb-4">
              <label htmlFor={name} className='form-label'>
                {label}
              </label>
              <select
                className= {getInputClasses()}
                id={name}
                value = {value}
                name ={name}
                onChange={handleChange}
              >
                <option disabled value="">
                    {defaultOption}
                </option>
                {optionsToArray.length > 0 &&
                    optionsToArray.map((profession) =>
                    <option
                        value={profession._id}
                        key = {profession._id}
                    >
                        {profession.name}
                    </option>
                    )
                }
              </select>
            {error &&
                <div className="invalid-feedback">
                 { error}
              </div>
            }
        </div>

    );
};

SelectField.propTypes = {
    label: PropTypes.string,
    name: PropTypes.string,
    value: PropTypes.object,
    onChange: PropTypes.func,
    defaultOption: PropTypes.oneOfType([PropTypes.object, PropTypes.array, PropTypes.string]),
    options: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
    error: PropTypes.string

};

export default SelectField;
