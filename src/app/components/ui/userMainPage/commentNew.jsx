import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import TextArea from '../../common/form/textArea';
import { validator } from '../../../utils/validator';

CommentNew.propTypes = {
    users: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
    onSubmit: PropTypes.func
};

function CommentNew({ onSubmit }) {
    const [data, setData] = useState({ text: '' });

    // SUBMIT
    const handleSubmit = (e) => {
        e.preventDefault();
        if (!validate()) return;
        const newComment = { content: data.text };
        onSubmit(newComment);
        setData({ text: '' });
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
        // name: {
        //     isRequired: { message: 'Name is required' }
        // },
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

        return (
            <form onSubmit={handleSubmit}>

                <TextArea
                    name='text'
                    rows='3'
                    cols='60'
                    value={data.text || ''}
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

export default CommentNew;
