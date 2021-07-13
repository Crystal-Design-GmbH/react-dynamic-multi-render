import { DynamicMultiRenderConfig } from './config';

export function getComponentIndexFilePath({
  componentName,
  templateConfig,
}: Partial<DynamicMultiRenderConfig> & { componentName: string }) {
  const templateName =
    (templateConfig
      ? Array.isArray(templateConfig[componentName])
        ? templateConfig[componentName][0]
        : templateConfig[componentName]
      : undefined) ?? 'standard';

  const indexFilePath = `${templateName}`;

  const fullRelativeIndexPath = `${componentName}/${indexFilePath}`;

  return fullRelativeIndexPath;
}
//fake changes