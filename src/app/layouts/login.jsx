import React, { useEffect, useState } from 'react';
import TextField from '../components/textField';
import { validator } from '../utils/validator';

const Login = () => {
    const [data, setData] = useState({ email: '', password: '' });

    // SUBMIT
    const handleSubmit = (e) => {
        e.preventDefault();
        if (!validate()) return;
        console.log('data', data);
    };

    // FORM CHANGE
    const handleChange = (e) => {
        const { name, value } = e.target;
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
        console.log('errors', errors, Object.keys(errors).length);
        return Object.keys(errors).length === 0;
    };

    return (
        <div className="container mt-5">
            <div className="row">
                <div className = 'col-md-6 offset-md-3 p-4 shadow'>
                    <h3 className='mb-4'>Login</h3>
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
                        <button
                            type="submit"
                            className='btn btn-primary w-100 mx-auto'
                            disabled={!(Object.keys(errors).length === 0)}
                        >
                            Submit
                        </button>
                    </form>

                </div>

            </div>

        </div>
    );
};

export default Login;
