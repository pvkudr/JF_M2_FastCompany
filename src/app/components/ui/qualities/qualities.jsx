import React from 'react';
import PropTypes from 'prop-types';
import { useProfAndQual } from '../../../hooks/useProfAndQual';

const Qualities = function ({ qualities }) {
  const { isQualLoading, getQualityList } = useProfAndQual();
  // console.log('qualities_from_qual', qualities);
  const qaul = getQualityList(qualities);
  // console.log('qaul', qaul);
  // console.log('isQualLoading', isQualLoading);
  if (!isQualLoading) {
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
