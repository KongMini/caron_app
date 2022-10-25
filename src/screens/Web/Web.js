import React from 'react';
import {AppWeb} from '../../elements';

const Web = ({route}) => {
  const {title, source} = route.params;

  return <AppWeb title={title} source={source} />;
};

export default Web;
