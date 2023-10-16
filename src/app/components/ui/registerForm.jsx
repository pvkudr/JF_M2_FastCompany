import React, { useEffect, useState } from 'react';
import TextField from '../common/form/textField';
import { validator } from '../../utils/validator';
import SelectField from '../common/form/selectField';
import RadioField from '../common/form/radioField';
import MultiSelectField from '../common/form/multiSelectField';
import CheckBoxField from '../common/form/checkBoxField';
import { useDispatch, useSelector } from 'react-redux';
import { getQualities, getQualitiesLoadingStatus } from '../../store/qualities';
import { getProfessions } from '../../store/professions';
import { signUp } from '../../store/users';

const RegisterForm = () => {
    const dispatch = useDispatch();
    const [data, setData] = useState({
        email: '',
        password: '',
        profession: '',
        name: '',
        sex: 'male',
        qualities: [],
        licence: false
    });

    const professions = useSelector(getProfessions());

    const qualities = useSelector(getQualities());
    const isQualLoading = useSelector(getQualitiesLoadingStatus());

    // SUBMIT
    // const { signUp } = useAuth();

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validate()) return;
        console.log('reg_form_data= ', data);
        const newData = { ...data, qualities: data.qualities.map((q) => q.value) }; // to match firebase datapattern
        console.log('reg_form_Newdata=  ', newData);

        dispatch(signUp(newData));
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
        name: {
            isRequired: { message: 'Name is required' },
            min: { message: 'Name must have at least 3 characters', value: 3 }
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
                label = 'Name'
                name = 'name'
                value = {data.name}
                onChange = {handleChange}
                error = {errors.name}
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
            { !isQualLoading &&
            <MultiSelectField
                label='Choose your qualities'
                options = {qualities}
                onChange = {handleChange}
                name = 'qualities'
                defaultOption = {data.qualities}
            />}
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
