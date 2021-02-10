import React, { Suspense } from 'react';
import {
  DynamicMultiRenderConfig,
  useDynamicMultiRenderConfig,
} from './config';
import ErrorBoundary from './ErrorBounday';
import LoadingFallback from './Loading';
import { getComponentIndexFilePath } from './util';

interface DynamicMultiRenderProps {
  componentName: string;
}

function loadComponent({
  componentName,
  templateConfig,
  importFactory,
}: Partial<DynamicMultiRenderConfig> & DynamicMultiRenderProps) {
  if (componentName === undefined || importFactory === undefined)
    return () => <></>;

  const fullRelativeIndexPath = getComponentIndexFilePath({
    componentName,
    templateConfig,
    importFactory,
  });

  const Component = React.lazy(() => importFactory(fullRelativeIndexPath));
  return Component;
}

const DynamicMultiRender = ({ componentName }: DynamicMultiRenderProps) => {
  const config = useDynamicMultiRenderConfig();

  const Component = loadComponent({
    componentName,
    importFactory: config?.importFactory,
    templateConfig: config?.templateConfig,
  });

  return (
    <Suspense fallback={<LoadingFallback />}>
      <ErrorBoundary>
        <Component />
      </ErrorBoundary>
    </Suspense>
  );
};

export default DynamicMultiRender;

export * from './config';
