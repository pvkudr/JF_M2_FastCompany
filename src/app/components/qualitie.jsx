import React from 'react';

const Quality = function (qualities) {
  return qualities.map((item) => (
    <span className={'m-2 badge bg-' + item.color} key={item._id}>
      {item.name}
    </span>
  ));
};

export default Quality;
