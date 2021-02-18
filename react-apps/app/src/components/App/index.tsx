import {
  DynamicMultiRenderProvider,
  DynamicMultiRenderConfig,
} from 'react-dynamic-multi-render';
import React, { Suspense, useEffect, useState } from 'react';
import Loading from '../Loading';
import MainImage from '../template/MainImage';

interface Props {}

/**
 * Simulates the retrieval of the config
 * from a remote server
 */
async function loadDynamicMultiRenderConfigFromServer() {
  const dynamicMultiRenderConfig: DynamicMultiRenderConfig = {
    templateConfig: {
      MainImage: 'standard',
      NextButton: 'standard',
      Settings: ['standard', { preload: false }],
    },
    importFactory: (path) => import(`../template/${path}`),
  };

  return dynamicMultiRenderConfig;
}

const App = ({}: Props) => {
  const [
    dynamicMultiRenderConfig,
    setDynamicMultiRenderConfig,
  ] = useState<DynamicMultiRenderConfig>();

  useEffect(() => {
    let didCancel = false;

    (async () => {
      const configFromServer = await loadDynamicMultiRenderConfigFromServer();
      if (!didCancel) {
        setDynamicMultiRenderConfig(configFromServer);
      }
    })();

    return () => {
      didCancel = true;
    };
  }, [loadDynamicMultiRenderConfigFromServer]);

  return (
    <Suspense fallback={<Loading />}>
      <DynamicMultiRenderProvider value={dynamicMultiRenderConfig}>
        <MainImage />
      </DynamicMultiRenderProvider>
    </Suspense>
  );
};

export default App;
