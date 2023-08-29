import React, { useEffect, useState } from 'react';
import { validator } from '../../utils/validator';
import TextField from '../common/form/textField';
import SelectField from '../common/form/selectField';
import RadioField from '../common/form/radioField';
import MultiSelectField from '../common/form/multiSelectField';
import BackButton from '../common/backButton';
import { useProfAndQual } from '../../hooks/useProfAndQual';
import { useAuth } from '../../hooks/useAuth';
import { useHistory } from 'react-router-dom/cjs/react-router-dom';
import { getQualities, getQualitiesLoadingStatus } from '../../store/qualities';
import { useSelector } from 'react-redux';

const UserChangePage = () => {
    // console.log('userChangePage_STORE', store);

    const [isLoading, setLoading] = useState(true);
    const [data, setData] = useState();
    const { professions, isProfLoading, getQualityList } = useProfAndQual();
    const { updateUserData, currentUser } = useAuth();
    const history = useHistory();

    const qualities = useSelector((state) => state.qualities);

    const isQualLoading = useSelector(getQualitiesLoadingStatus());
    console.log('userChangePage_qual', qualities, isQualLoading);

    console.log('userChangePage_', [currentUser, isQualLoading, data]);

    // console.log('userChangePage_proff', professions);
    // console.log('userChangePage_qual', qualities);

    useEffect(() => {
        if (!isQualLoading && currentUser && !data) {
            setData({
                ...currentUser, qualities: getQualityList(currentUser.qualities)
            });
            console.log('userChangePage_data', data);
            console.log('userChangePage_currentUser', currentUser);
        }
    }, [currentUser, isQualLoading, data]);
    //
    useEffect(() => {
        if (data) {
            setLoading(false);
        }
    }, [data]);

    // SUBMIT
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validate()) return;
        // form changed user
        // was not changed - {_id:, name:}, changed - {value:, label:}

        // if (data.qualities.length && data.qualities[0].label) {
        // data.qualities = data.qualities.map((quality) => ({ _id: quality.value, name: quality.label, color: quality.color }));
        // }
        console.log('userchange_submit_before:', data);
        let newData = { ...data };
        if (data.qualities[0].value) {
            newData = { ...data, qualities: data.qualities.map((q) => q.value) };
        } else {
            newData = { ...data, qualities: data.qualities.map((q) => q._id) };
        }

        // if (!data.qualities[0].label) {
        //     newData = { ...data, qu alities: data.qualities.map((q) => q.value) };
        // }
        // // was not changed - type= {}, changed - type = string
        // if (typeof (data.profession) === 'string') {
        //     const getProfById = Object.values(professions).filter((profession) => {
        //         return profession._id === data.profession;
        //     });
        //     data.profession = getProfById[0];
        // }
        // // update with changed user
        console.log('userchange_submit:', newData);
        updateUserData(newData);
        history.push(`/users/${currentUser._id}`);
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
        // console.log('errors', errors);
    }, [data]);

    const validate = () => {
        if (!isLoading) {
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
                        {(!isQualLoading && !isProfLoading && !isLoading)
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
                                    defaultOption = {getQualityList(currentUser.qualities)}
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

// UserChangePage.propTypes = {
//     userId: PropTypes.string.isRequired
// };

export default UserChangePage;
