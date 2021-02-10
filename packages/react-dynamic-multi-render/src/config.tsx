import React, {
  ComponentProps,
  createContext,
  useContext,
  useEffect,
} from 'react';
import prefetchComponents from './prefetch';

interface TemplateElementConfig {
  /**
   * Defaults to true!
   * If true, component
   * will be preloaded
   * immediately. If false,
   * component will be loaded
   * as soon it's used the first
   * time.
   */
  preload?: boolean;
}
type TemplateConfigElement = string | [string, TemplateElementConfig];

export interface DynamicMultiRenderConfig {
  /**
   * For each component which gets
   * dynamically rendered, a different
   * version can be rendered. The version
   * name for each component **MUST** be specified
   * here in the `templateConfig` object.
   * By default, just set `standard`.
   * Instead of directly specifying the
   * name of the component version, an array
   * can passed, with a configuration object
   * as the second parameter, like so:
   * ```javacript
   * {
   *  GalleryItem: ['standard', { preload: false }]
   * }
   * ```
   * By default, all components get preloaded.
   * To disable that behaviour for a specific
   * component, set preload to false.
   * **ONLY** components which are in the
   * templateConfig get preloaded.
   */
  templateConfig: { [componentName: string]: TemplateConfigElement };
  /**
   * A function that must call a dynamic import().
   * This must return a Promise which resolves to a module with
   * a default export containing a React component.
   * The path passed in points to an index file
   * inside a template Component. The dynamic import
   * MUST always start with a relative directory,
   * e.g.
   * ```javascript
   * (path) => import(`../${path}`)
   * ```
   */
  importFactory: (path: string) => Promise<any>;
}

type ContextDataType = DynamicMultiRenderConfig | undefined;

const DynamicMultiRenderContext = createContext<ContextDataType>(undefined);

export const DynamicMultiRenderProvider: React.FC<
  ComponentProps<typeof DynamicMultiRenderContext.Provider>
> = (props) => {
  useEffect(() => {
    if (props.value) {
      prefetchComponents(props.value);
    }
  }, [props.value]);
  return <DynamicMultiRenderContext.Provider {...props} />;
};

export function useDynamicMultiRenderConfig() {
  const context = useContext(DynamicMultiRenderContext);
  return context;
}
