import React from 'react';
import { IoCloseCircleOutline as CloseIcon } from 'react-icons/io5';
import { SettingsProps } from '..';

import { settingsContainer } from './index.module.css';

const SettingsStandard = ({
  onTagsChange,
  onClose,
  activeTags,
}: SettingsProps) => {
  return (
    <div className={settingsContainer}>
      <header>
        <h2>Active image topics</h2>
        <button onClick={onClose}>
          <CloseIcon size="1.5rem" />
        </button>
      </header>

      <div>
        {activeTags.map(({ tag, isActive }) => (
          <div key={tag}>
            <input
              onChange={() => {
                if (isActive) {
                  onTagsChange(
                    activeTags.map((currTag) => {
                      if (currTag.tag === tag) {
                        return {
                          ...currTag,
                          isActive: false,
                        };
                      }
                      return currTag;
                    }),
                  );
                } else {
                  onTagsChange(
                    activeTags.map((currTag) => {
                      if (currTag.tag === tag) {
                        return {
                          ...currTag,
                          isActive: true,
                        };
                      }
                      return currTag;
                    }),
                  );
                }
              }}
              checked={isActive}
              value={tag}
              type="checkbox"
              id={tag}
            />
            <label htmlFor={tag}>{tag}</label>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SettingsStandard;
