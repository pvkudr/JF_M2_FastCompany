import PropTypes from 'prop-types';
import React from 'react';
import { getProfessionById, getProfessionsLoadingStatus } from '../../store/professions';
import { useSelector } from 'react-redux';

const Profession = ({ id }) => {
    const isProfLoading = useSelector(getProfessionsLoadingStatus());
    const prof = useSelector(getProfessionById(id));

    if (!isProfLoading) {
        return <p>{prof.name}</p>;
    } else return 'Loading...';
};

Profession.propTypes = {
    id: PropTypes.string
};

export default Profession;
