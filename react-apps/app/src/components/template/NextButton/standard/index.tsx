import React from 'react';
import classnames from 'classnames';
import { NextButtonProps } from '..';

import { nextBtn } from './index.module.css';

const NextButtonStandard = ({ className, ...props }: NextButtonProps) => {
  return (
    <button {...props} className={classnames(nextBtn, className)}>
      Next
    </button>
  );
};

export default NextButtonStandard;
