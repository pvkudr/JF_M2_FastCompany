import React from 'react';
import PropTypes from 'prop-types';

const Qualities = function ({ qualities }) {
  return qualities.map((item) => (
    <span className={'m-2 badge bg-' + item.color} key={item._id}>
      {item.name}
    </span>
  ));
};
Qualities.propTypes = {
  qualities: PropTypes.array.isRequired
};
export default Qualities;
