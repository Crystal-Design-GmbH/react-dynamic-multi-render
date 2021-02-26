import React, { useEffect, useState } from 'react';
import { loader as loaderClass } from './index.module.css';
import loader from './loading.svg';

interface Props {
  name?: string;
}

const DELAY = 250;

/**
 * Only shows up after 250ms
 * to prevent a flash
 */
const Loading = ({ name: cmpName }: Props) => {
  const [show, setShow] = useState<boolean>(false);

  console.log(`[LAZY LOAD] ${cmpName ?? ''}`);

  useEffect(() => {
    let didCancel = false;

    window.setTimeout(() => {
      if (!didCancel) setShow(true);
    }, DELAY);

    return () => {
      didCancel = true;
    };
  }, [DELAY, cmpName]);

  if (!show) return <></>;

  return (
    <div className={loaderClass}>
      <img src={loader} alt="Loading" />
    </div>
  );
};

export default Loading;
