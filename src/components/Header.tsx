import React from 'react';

import {Appbar, Text} from 'react-native-paper';

interface ContentType {
  title: string;
  isBack: boolean;
  onBack?: () => void;
}
const Header = ({title, isBack, onBack}: ContentType) => {
  return (
    <Appbar.Header>
      {isBack ? (
        <>
          <Appbar.BackAction onPress={onBack} />
          <Appbar.Content title={title} />
        </>
      ) : (
        <>
          <Text variant="headlineMedium">{title}</Text>
        </>
      )}
    </Appbar.Header>
  );
};

export default Header;
