import React, { lazy } from 'react';
import { DynamicMultiRenderConfig, DynamicMultiRenderProps } from '.';
import { getComponentIndexFilePath } from './util';

type LoadComponentParams = Partial<DynamicMultiRenderConfig> &
  DynamicMultiRenderProps;

const componentCache: Map<string, React.ComponentType<any>> = new Map();

function getCacheKey(parameters: LoadComponentParams) {
  const { componentName, importFactory, templateConfig } = parameters;
  const componentTemplateConfig = templateConfig
    ? templateConfig[componentName]
    : '';
  const cacheKey = JSON.stringify({
    [componentName]: componentTemplateConfig,
    importFactory: importFactory?.toString() ?? '',
  });

  return cacheKey;
}

/**
 * Will be called when the app
 * starts and preloading is enabled
 * for a component. Initializes the cache
 * with the fully loaded component
 * if the lazy loaded wasn't requested
 * before.
 */
export function preloadComponent(parameters: LoadComponentParams) {
  const { componentName, templateConfig, importFactory } = parameters;

  if (templateConfig === undefined || importFactory === undefined) {
    return;
  }

  const cacheKey = getCacheKey(parameters);

  const startPreload = async () => {
    const fullRelativeIndexPath = getComponentIndexFilePath({
      componentName,
      templateConfig,
      importFactory,
    });
    const { default: Component } = await importFactory(fullRelativeIndexPath);
    if (!componentCache.has(cacheKey)) {
      // 'loadComponent' wasn't yet called
      componentCache.set(cacheKey, Component);
    }
  };

  startPreload();
}

/**
 * Returns a cached version
 * of the component if available,
 * or returns a new React.lazy
 * component
 */
export default function loadComponent(parameters: LoadComponentParams) {
  const cacheKey = getCacheKey(parameters);
  if (componentCache.has(cacheKey)) {
    return componentCache.get(cacheKey)!;
  }
  const Component = getReactLazyComponent(parameters);
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
function getReactLazyComponent({
  componentName,
  templateConfig,
  importFactory,
}: LoadComponentParams) {
  if (
    componentName === undefined ||
    importFactory === undefined ||
    templateConfig === undefined
  )
    return () => <></>;

  const fullRelativeIndexPath = getComponentIndexFilePath({
    componentName,
    templateConfig,
    importFactory,
  });

  const Component = lazy(() => importFactory(fullRelativeIndexPath));

  return Component;
}
