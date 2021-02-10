import DynamicMultiRender from 'dynamic-multi-render';
import React from 'react';

interface Props {}

const CheckoutButton = (props: Props) => {
  return <DynamicMultiRender componentName="CheckoutButton" />;
};

export default CheckoutButton;
