import React from 'react';
import { NextButtonProps } from '..';
import NextButtonStandard from '../standard';

import { nextBtnMars } from './index.module.css';

const NextButtonMars = (props: NextButtonProps) => {
  return <NextButtonStandard {...props} className={nextBtnMars} />;
};

export default NextButtonMars;
