import React, { useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { toast } from 'react-toastify';
import professionService from '../services/profession.service';
import qualityService from '../services/quality.service';

const ProfessionContext = React.createContext();

export const useProfAndQual = () => {
    return useContext(ProfessionContext);
};

const ProfessionProvider = ({ children }) => {
    const [professions, setProfessions] = useState([]);
    const [isProfLoading, setIsProfLoading] = useState(true);
    const [qualities, setQualities] = useState([]);
    const [isQualLoading, setIsQualLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        getProfessions();
        getQualities();
    }, []);

    useEffect(() => {
        if (error !== null) {
            toast(error);
            setError(null);
        }
    }, [error]);

    // get professions
    async function getProfessions() {
        try {
            const data = await professionService.get();
            setProfessions(data.content);
            setIsProfLoading(false);
        } catch (error) {
            errorCatcher(error);
        }
    }

    // for:
    function getProfessionById(id) {
        if (!isProfLoading) {
            return professions.find((p) => p._id === id); // string
        }
    }

    // get qualities
    async function getQualities() {
        try {
            const data = await qualityService.get();
            setQualities(data.content);
            setIsQualLoading(false);
        } catch (error) {
            errorCatcher(error);
        }
    }
    function getQualityList(arrayFromUsers) {
        if (!isQualLoading) {
            const newArr = [];
            arrayFromUsers.forEach((id) => {
                const searchedQuality = qualities.find((q) => q._id === id);
                newArr.push(searchedQuality);
                }
            );
            return newArr; // array
        }
    }

    function errorCatcher(error) {
        const { message } = error.response.data;
        setError(message);
    }

    return (
        <ProfessionContext.Provider
            value={{
                professions,
                isProfLoading,
                getProfessionById,
                qualities,
                isQualLoading,
                getQualityList
            }}
        >
            {children}
        </ProfessionContext.Provider>
    );
};
ProfessionProvider.propTypes = {
    children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node])
};

export default ProfessionProvider;
