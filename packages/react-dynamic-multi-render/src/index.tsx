import React, { Suspense } from 'react';
import {
  DynamicMultiRenderConfig,
  useDynamicMultiRenderConfig,
} from './config';
import ErrorBoundary from './ErrorBounday';
import { getComponentIndexFilePath } from './util';

interface DynamicMultiRenderProps {
  componentName: string;
}

console.log('change');

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

const DynamicMultiRender = ({
  componentName,
  ...props
}: DynamicMultiRenderProps & { [propName: string]: any }) => {
  const config = useDynamicMultiRenderConfig();

  const Component = loadComponent({
    componentName,
    importFactory: config?.importFactory,
    templateConfig: config?.templateConfig,
  });

  return (
    <ErrorBoundary>
      <Component {...props} />
    </ErrorBoundary>
  );
};

export default DynamicMultiRender;

export * from './config';
