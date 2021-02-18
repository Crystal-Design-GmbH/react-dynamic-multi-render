import React from 'react';
import { useDynamicMultiRenderConfig } from './config';
import ErrorBoundary from './ErrorBounday';
import loadComponent from './load-component';

export interface DynamicMultiRenderProps {
  componentName: string;
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
  // const [Component, setComponent] = useState<LazyComponent>(getLazyComponent);

  // useEffect(() => {
  //   setComponent(getLazyComponent);
  // }, [componentName, config?.importFactory, config?.templateConfig]);

  return (
    <ErrorBoundary>
      <Component {...props} />
    </ErrorBoundary>
  );
};

export default DynamicMultiRender;

export * from './config';
