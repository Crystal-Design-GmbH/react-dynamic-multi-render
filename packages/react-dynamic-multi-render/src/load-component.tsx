import React from 'react';
import { DynamicMultiRenderConfig, DynamicMultiRenderProps } from '.';
import { getComponentIndexFilePath } from './util';

const componentCache: Map<
  string,
  ReturnType<typeof loadComponentNoCache>
> = new Map();

type LoadComponentParams = Partial<DynamicMultiRenderConfig> &
  DynamicMultiRenderProps;

export default function loadComponent(parameters: LoadComponentParams) {
  const { componentName, importFactory, templateConfig } = parameters;
  const componentTemplateConfig = templateConfig
    ? templateConfig[componentName]
    : '';
  const cacheKey = JSON.stringify({
    [componentName]: componentTemplateConfig,
    importFactory: importFactory?.toString() ?? '',
  });
  if (componentCache.has(cacheKey)) {
    return componentCache.get(cacheKey)!;
  }
  const Component = loadComponentNoCache(parameters);
  componentCache.set(cacheKey, Component);
  return Component;
}

/**
 * Returns a React.lazy component
 * which gets imported dynamically.
 * It caches loaded components
 * based on the input parameters.
 * It does this independently
 * of a component's lifecycle.
 */
function loadComponentNoCache({
  componentName,
  templateConfig,
  importFactory,
}: LoadComponentParams) {
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
