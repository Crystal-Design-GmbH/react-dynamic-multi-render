import DynamicMultiRender from 'react-dynamic-multi-render';
import React from 'react';

export interface SettingsProps {
  onTagsChange: (p: { tag: string; isActive: boolean }[]) => void;
  onClose: () => void;
  activeTags: { tag: string; isActive: boolean }[];
}

const Settings = (props: SettingsProps) => {
  return <DynamicMultiRender {...props} componentName="Settings" />;
};

export default Settings;
