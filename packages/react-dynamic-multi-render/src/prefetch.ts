import { DynamicMultiRenderConfig } from './config';
import { preloadComponent } from './load-component';

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
    const componentConfig = config.templateConfig[componentName];
    let shouldPreload = true;
    if (typeof componentConfig !== 'string') {
      shouldPreload = componentConfig[1]?.preload ?? true;
    }
    if (shouldPreload) {
      // This prefetches the component
      window.requestAnimationFrame(() => {
        // prefetch component and initialize cache
        preloadComponent({
          ...config,
          componentName,
        });
      });
    }
  }
}
