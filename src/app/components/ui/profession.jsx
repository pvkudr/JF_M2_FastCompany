import { useProfAndQual } from '../../hooks/useProfAndQual';
import PropTypes from 'prop-types';
import React from 'react';

const Profession = ({ id }) => {
    const { isProfLoading, getProfessionById } = useProfAndQual();
    const prof = getProfessionById(id);
    if (!isProfLoading) {
        return <p>{prof.name}</p>;
    } else return 'Loading...';
};

Profession.propTypes = {
    id: PropTypes.string
};

export default Profession;
