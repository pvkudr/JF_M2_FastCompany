import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { getQualitiesLoadingStatus, getQualityList, loadQualitiesList } from '../../../store/qualities';

const Qualities = function ({ qualities }) {
  // const { getQualityList } = useProfAndQual();
  const isQualLoading = useSelector(getQualitiesLoadingStatus());
  const qaul = useSelector(getQualityList(qualities));
  // const qaul = getQualityList(qualities);

  const dispatch = useDispatch();

  useEffect(() => {
    console.log('useEff from qual is working');
    dispatch(loadQualitiesList());
  }, []);

  console.log('qualities_from_qual', qualities, isQualLoading);
  console.log('getQualityList_from_qual', getQualityList);
  // todo: getQualityList - dont need???? now its a proper list

  // console.log('qaul', qaul);
  // console.log('isQualLoading', isQualLoading);
  if (!isQualLoading && qaul) {
    console.log('from_qual_QUAL', qaul);

    return qaul.map((item) => (
        <span className={'m-2 badge bg-' + item.color} key={item._id}>
      {item.name}
    </span>
    ));
  } else return 'Loading...';
};
Qualities.propTypes = {
  qualities: PropTypes.array.isRequired
};
export default Qualities;
