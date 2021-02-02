import React from 'react';
import Block from './Block';
import ImageComponent from './ImageComponent';

const EmptyFile = () => {
  return (
    <Block center middle>
      <ImageComponent name="empty_icon" height="200" width="200" />
    </Block>
  );
};

export default EmptyFile;
