import DynamicMultiRender from 'dynamic-multi-render';
import React from 'react';

interface Props {}

const GalleryItem = ({}: Props) => {
  return <DynamicMultiRender componentName="GalleryItem" />;
};

export default GalleryItem;
