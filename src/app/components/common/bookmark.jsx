import React from 'react';
import PropTypes from 'prop-types';

const BookMark = ({ status, ...rest }) => {
  return (
    <button {...rest}>
      <i className={'bi bi-emoji' + (status ? '-smile-fill' : '-neutral')}></i>
    </button>
  );
};

BookMark.propTypes = {
  status: PropTypes.bool.isRequired
};

export default BookMark;
