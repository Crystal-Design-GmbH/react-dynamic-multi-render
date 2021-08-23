import React from 'react';
import MainImageStandard from '../standard';
import { marsContainer, marsImage } from './index.module.css';

interface Props {}

const MainImageMars = (props: Props) => {
  return (
    <MainImageStandard
      containerClassName={marsContainer}
      imageClassName={marsImage}
    />
  );
};

export default MainImageMars;
