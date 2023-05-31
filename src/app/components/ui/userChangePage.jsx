import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
 import api from '../../api';
import { validator } from '../../utils/validator';
import TextField from '../common/form/textField';
import SelectField from '../common/form/selectField';
import RadioField from '../common/form/radioField';
import MultiSelectField from '../common/form/multiSelectField';
import { useHistory } from 'react-router-dom/cjs/react-router-dom';
import BackButton from '../common/backButton';

const UserChangePage = ({ userId }) => {
    const history = useHistory();
    const [user, setUser] = useState({});
    const [professions, setProfession] = useState();
    const [qualities, setQualities] = useState({});
    const [data, setData] = useState({});

    useEffect(() => {
        api.users.getById(userId).then((data) => setUser(data));
        api.professions.fetchAll().then((data) => setProfession(data));
        api.qualities.fetchAll().then((data) => setQualities(data));
    }, []);
    useEffect(() => {
        setData((prevState) => ({
            ...prevState,
            name: user.name,
            email: user.email,
            profession: user.profession,
            sex: user.sex,
            qualities: user.qualities ? user.qualities : []
        }));
    }, [user]);

    // SUBMIT
    const handleSubmit = (e) => {
        e.preventDefault();
        if (!validate()) return;
        // form changed user
        // was not changed - {_id:, name:}, changed - {value:, label:}
        if (data.qualities.length && data.qualities[0].label) {
            data.qualities = data.qualities.map((quality) => ({ _id: quality.value, name: quality.label, color: quality.color }));
        }
        // was not changed - type= {}, changed - type = string
        if (typeof (data.profession) === 'string') {
            const getProfById = Object.values(professions).filter((profession) => {
                return profession._id === data.profession;
            });
            data.profession = getProfById[0];
        }
        // update with changed user
        api.users.update(userId, data).then((data) => {
            history.push(`/users/${userId}`);
            console.log(data);
        });
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
        name: {
            isRequired: { message: 'Name is required' }
        },
        email: {
            isRequired: { message: 'Email is required' },
            isEmail: { message: 'Email is incorrect' }
        },
        qualities: {
            isRequired: { message: 'Quality is required, one or more' }
        }
    };

    useEffect(() => {
        validate();
        console.log('errors', errors);
    }, [data]);

    const validate = () => {
        if (data.name !== undefined && data.email !== undefined) {
            const errors = validator(data, validatorConfig);
            setErrors(errors);
            return Object.keys(errors).length === 0;
        }
    };

    return (
        <div className="container mt-5">
            <BackButton/>

                <div className="row">
                    <div className = 'col-md-6 offset-md-3 p-4 shadow'>
                        {(Object.keys(user).length !== 0 && professions)
                            ? <form onSubmit={handleSubmit}>
                                <TextField
                                    label = 'Name'
                                    name = 'name'
                                    value = {data.name}
                                    onChange = {handleChange}
                                    error = {errors.name}
                                />
                                <TextField
                                    label = 'Email'
                                    name = 'email'
                                    value = {data.email}
                                    onChange = {handleChange}
                                    error = {errors.email}
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
                                    defaultOption = {user.qualities}
                                    error={errors.qualities}
                                 />

                                <button
                                    type="submit"
                                    className='btn btn-primary w-100 mx-auto'
                                    disabled={!(Object.keys(errors).length === 0)}
                                >
                                    Submit
                                </button>
                            </form>
                            : 'Loading..'}
                    </div>
                </div>
        </div>
    );
};

UserChangePage.propTypes = {
    userId: PropTypes.string.isRequired
};

export default UserChangePage;
