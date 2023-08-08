import React from 'react';
import PropTypes from 'prop-types';
import Select from 'react-select';

const MultiSelectField = ({
    label,
    onChange,
    options,
    name,
    defaultOption,
    error
}) => {
    const getInputClasses = () => {
        return 'basic-multi-select' + (error ? ' is-invalid' : '');
     };
    const optionsToArray = Array.isArray(options) && typeof options === 'object'
        ? options.map((option) => (
            { value: option._id, label: option.name, color: option.color }
        ))
        : Object.values(options).map((option) => (
            { value: option._id, label: option.name, color: option.color }
        ));

    const defaultOptionsToArray = Array.isArray(defaultOption) && typeof defaultOption === 'object'
        ? defaultOption.map((option) => (
            { value: option._id, label: option.name, color: option.color }
        ))
        : Object.values(defaultOption).map((option) => (
            { value: option._id, label: option.name, color: option.color }
        ));
    const handleChange = (e) => {
        const c = name;
        onChange({ name: c, value: e });
    };

    return (
        <div className="mb-4">
            <label htmlFor= {name} className='form-label'>
                {label}
            </label>
            <Select
                isMulti
                closeMenuOnSelect={false}
                name = {name}
                options= {optionsToArray}
                className ={getInputClasses()}
                classNamePrefix='select'
                onChange = {handleChange}
                defaultValue = {defaultOptionsToArray}
            />
            {error &&
                <div className="invalid-feedback">
                    { error}
                </div>}
        </div>
    );
};

MultiSelectField.propTypes = {
    label: PropTypes.string,
    value: PropTypes.string,
    name: PropTypes.string,
    onChange: PropTypes.func,
    defaultOption: PropTypes.array,
    options: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
    error: PropTypes.string

};

export default MultiSelectField;
