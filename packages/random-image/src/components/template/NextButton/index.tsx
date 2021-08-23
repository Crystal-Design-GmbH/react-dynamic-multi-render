import DynamicMultiRender from 'react-dynamic-multi-render';
import React, { ComponentProps } from 'react';

export interface NextButtonProps extends ComponentProps<'button'> {}

const NextButton = (props: NextButtonProps) => {
  return <DynamicMultiRender {...props} componentName="NextButton" />;
};

export default NextButton;
