import React from 'react';
import { NextButtonProps } from '..';

import { nextBtn } from './index.module.css';

const NextButtonStandard = (props: NextButtonProps) => {
  return (
    <button {...props} className={nextBtn}>
      Next
    </button>
  );
};

export default NextButtonStandard;
