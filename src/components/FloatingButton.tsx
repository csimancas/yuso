import React from 'react';
import {StyleSheet, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

interface FloatingButtonProps {
  action: () => void;
}

const FloatingButton = ({action}: FloatingButtonProps) => {
  return (
    <TouchableOpacity
      style={[styles.container, {backgroundColor: 'blue'}]}
      onPress={action}>
      <Icon name="plus" size={30} color="white" />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 60,
    width: 60,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    bottom: 20,
    right: 20,
  },
});

export default FloatingButton;
