import React, { useEffect, useState } from 'react';
import TextField from '../common/form/textField';
import { validator } from '../../utils/validator';
import api from '../../api';
import SelectField from '../common/form/selectField';
import RadioField from '../common/form/radioField';
import MultiSelectField from '../common/form/multiSelectField';
import CheckBoxField from '../common/form/checkBoxField';

const RegisterForm = () => {
    const [data, setData] = useState({
        email: '',
        password: '',
        profession: '',
        sex: 'male',
        qualities: [],
        licence: false
    });

    const [professions, setProfession] = useState();
    const [qualities, setQualities] = useState({});

    useEffect(() => {
        api.professions.fetchAll().then((data) => setProfession(data));
        api.qualities.fetchAll().then((data) => setQualities(data));
    }, []);

    // SUBMIT
    const handleSubmit = (e) => {
        e.preventDefault();
        if (!validate()) return;
        console.log('submit_data= ', data);
    };

    // FORM CHANGE
    const handleChange = (obj) => {
        const { name, value } = obj;
        setData((prevState) => (
            { ...prevState, [name]: value }
        ));
    };

    // VALIDATION
    const [errors, setErrors] = useState({});

    const validatorConfig = {
        email: {
            isRequired: { message: 'Email is required' },
            isEmail: { message: 'Email is incorrect' }
        },
        password: {
            isRequired: { message: 'Password is required' },
            isCapitalSymbol: { message: 'Capital letter is required' },
            isDigit: { message: 'At least one digit is required' },
            min: { message: 'Passwords must have at least 8 characters', value: 8 }
        },
        profession: {
            isRequired: { message: 'Profession is  required' }
        },
        licence: {
            isRequired: { message: 'Licence is  required' }
        }
    };

    useEffect(() => {
        validate();
    }, [data]);

    const validate = () => {
        const errors = validator(data, validatorConfig);
        setErrors(errors);
        return Object.keys(errors).length === 0;
    };

    return (

        <form onSubmit={handleSubmit}>
            <TextField
                label = 'Email'
                name = 'email'
                value = {data.email}
                onChange = {handleChange}
                error = {errors.email}
            />

            <TextField
                label = 'Password'
                type="password"
                name = 'password'
                value = {data.password}
                onChange = {handleChange}
                error = {errors.password}
            />

            { professions &&
            <SelectField
                label='Choose your profession'
                name = 'profession'
                value = {data.profession}
                onChange = {handleChange}
                defaultOption = 'Choose..'
                options = {professions}
                error={errors.profession}
           />}
            <RadioField
                label='Choose your sex'
                options={ [
                    { name: 'Male', value: 'male' },
                    { name: 'Female', value: 'female' },
                    { name: 'Other', value: 'other' }
                ]}
                value = {data.sex}
                name = 'sex'
                onChange = {handleChange}
            />
            <MultiSelectField
                label='Choose your qualities'
                options = {qualities}
                onChange = {handleChange}
                name = 'qualities'
                defaultOption = {data.qualities}
            />
            <CheckBoxField
                value = {data.licence}
                onChange = {handleChange}
                name = 'licence'
                error = {errors.licence}
            >
                Accept <a> Licence Agreement </a>
            </CheckBoxField>

            <button
                type="submit"
                className='btn btn-primary w-100 mx-auto'
                disabled={!(Object.keys(errors).length === 0)}
            >
                Submit
            </button>
        </form>

    );
};

export default RegisterForm;
