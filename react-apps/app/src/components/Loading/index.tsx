import React, { useEffect, useState } from 'react';
import { loader as loaderClass } from './index.module.css';
import loader from './loading.svg';

interface Props {}

const DELAY = 250;

/**
 * Only shows up after 250ms
 * to prevent a flash
 */
const Loading = (props: Props) => {
  const [show, setShow] = useState<boolean>(false);

  useEffect(() => {
    let didCancel = false;

    window.setTimeout(() => {
      if (!didCancel) setShow(true);
    }, DELAY);

    return () => {
      didCancel = true;
    };
  }, [DELAY]);

  if (!show) return <></>;

  return (
    <div className={loaderClass}>
      <img src={loader} alt="Loading" />
    </div>
  );
};

export default Loading;
