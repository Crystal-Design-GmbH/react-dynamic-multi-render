import { DynamicMultiRenderConfig } from './config';
import { getComponentIndexFilePath } from './util';

/**
 * Prefetches all components
 * when first initialized,
 * based on the selected
 * version.
 * Components which
 * are not present in the templateConfig
 * will not get prefetched.
 */
export default function prefetchComponents(config: DynamicMultiRenderConfig) {
  const allComponentNames = Object.keys(config.templateConfig);
  for (const componentName of allComponentNames) {
    const fullRelativeIndexPath = getComponentIndexFilePath({
      ...config,
      componentName,
    });
    const componentConfig = config.templateConfig[componentName];
    let shouldPreload = true;
    if (typeof componentConfig !== 'string') {
      shouldPreload = componentConfig[1]?.preload ?? true;
    }
    const entryFilePath = `${componentName}/index.tsx`;
    // This prefetches the component
    window.requestAnimationFrame(() => {
      // Load entry file (index.tsx) and
      // the relevant version index.tsx
      config.importFactory(entryFilePath);
      config.importFactory(fullRelativeIndexPath);
    });
  }
}
