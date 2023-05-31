import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import SelectField from '../../common/form/selectField';
import TextArea from '../../common/form/textArea';
import { validator } from '../../../utils/validator';
import API from '../../../api';

CommentNew.propTypes = {
    users: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
    onSubmit: PropTypes.func
};

function CommentNew({ onSubmit }) {
    const [users, setUsers] = useState([]);
    const [data, setData] = useState({
        name: '',
        text: ''
    });

    useEffect(() => {
        API.users.fetchAll().then((data) => setUsers(data));
    }, []);

    // SUBMIT
    const handleSubmit = (e) => {
        e.preventDefault();
        if (!validate()) return;
        const newComment = { userId: data.name, content: data.text };
        onSubmit(newComment);
        setData({ name: '', text: '' });
        setErrors({});
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
        text: {
            isRequired: { message: 'Text is required' }
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
    if (users.length > 0) {
        return (
            <form onSubmit={handleSubmit}>
                <SelectField
                    label='Choose user'
                    name='name'
                    value={data.name}
                    onChange={handleChange}
                    defaultOption='Choose user'
                    options={users}
                    error={errors.name}
                />
                <TextArea
                    name='text'
                    rows='3'
                    cols='60'
                    value={data.text}
                    onChange={handleChange}
                    placeholder='Enter text..'
                    error={errors.text}
                />
                <button
                    type="submit"
                    className='btn btn-primary w-100'
                    disabled={!(Object.keys(errors).length === 0)}
                >
                    Publish
                </button>
            </form>
        );
    }
}

export default CommentNew;
