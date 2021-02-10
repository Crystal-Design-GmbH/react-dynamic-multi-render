import {
  DynamicMultiRenderProvider,
  DynamicMultiRenderConfig,
} from 'dynamic-multi-render';
import React, { useEffect, useState } from 'react';
import GalleryItem from '../template/GalleryItem';

interface Props {}

/**
 * Simulates the retrieval of the config
 * from a remote server
 */
async function loadDynamicMultiRenderConfigFromServer() {
  const dynamicMultiRenderConfig: DynamicMultiRenderConfig = {
    templateConfig: {
      GalleryItem: 'pluto',
      CheckoutButton: 'extended',
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
      setDynamicMultiRenderConfig(configFromServer);
    })();

    return () => {
      didCancel = true;
    };
  }, [loadDynamicMultiRenderConfigFromServer]);

  return (
    <DynamicMultiRenderProvider value={dynamicMultiRenderConfig}>
      <GalleryItem />
    </DynamicMultiRenderProvider>
  );
};

export default App;
