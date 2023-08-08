import React, { useEffect, useState } from 'react';
import TextField from '../common/form/textField';
import { validator } from '../../utils/validator';
import CheckBoxField from '../common/form/checkBoxField';
import { useAuth } from '../../hooks/useAuth';
import { useHistory } from 'react-router-dom/cjs/react-router-dom';

const LoginForm = () => {
    const [data, setData] = useState({ email: '', password: '', stayOn: true });
    const history = useHistory();
    // SUBMIT

    const { signIn } = useAuth();
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validate()) return;
        console.log('data_loginForm', data);
        try {
            await signIn(data);
            history.push('/');
        } catch (error) {
            console.log('loginError', error);
            setErrors(error);
        }
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
                        <CheckBoxField
                            value = {data.stayOn}
                            onChange = {handleChange}
                            name = 'stayOn'
                        >
                            Stay signed in
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

export default LoginForm;
