import React, { Suspense, useState } from 'react';
import { IoSettings as SettingsIcon } from 'react-icons/io5';
import {
  mainImageContainer,
  imageContainer,
  settingsBtn,
} from './index.module.css';

import NextButton from '../../NextButton';
import Settings from '../../Settings';
import Loading from '../../../Loading';
import classnames from 'classnames';

interface Props {
  containerClassName?: string;
  imageClassName?: string;
}

const RANDOM_IMG_URL = 'https://source.unsplash.com/random';
const POSSIBLE_TAGS = ['forest', 'dark', 'art', 'sea', 'mountain', 'lake'];
const allTags = POSSIBLE_TAGS.map((tag) => ({ tag, isActive: true }));

const MainImageStandard = ({ containerClassName, imageClassName }: Props) => {
  const [showSettings, setShowSettings] = useState<boolean>(false);
  const [activeTags, setTags] = useState<{ tag: string; isActive: boolean }[]>(
    allTags,
  );

  const getUrl = () =>
    `${RANDOM_IMG_URL}?date=${Date.now()}&${activeTags
      .map((t) => t.tag)
      .join(',')}`;

  const [imgUrl, setImgUrl] = useState<string>(getUrl());

  function onNext() {
    setImgUrl(getUrl());
  }

  return (
    <div className={classnames(mainImageContainer, containerClassName)}>
      <Suspense fallback={<Loading />}>
        {showSettings ? (
          <Settings
            onTagsChange={setTags}
            onClose={() => setShowSettings(false)}
            activeTags={activeTags}
          />
        ) : (
          <>
            <div
              className={classnames(imageContainer, imageClassName)}
              style={{ backgroundImage: `url(${imgUrl})` }}
            >
              <button
                className={settingsBtn}
                onClick={() => setShowSettings(true)}
              >
                <SettingsIcon size="1rem" />
              </button>
            </div>
            <NextButton onClick={onNext} />
          </>
        )}
      </Suspense>
    </div>
  );
};

export default MainImageStandard;
