import React from 'react';
import {View, StyleSheet, Modal} from 'react-native';
import {Avatar, Button, Card, Text} from 'react-native-paper';

interface ContentType {
  item: {
    img: string;
    fullName: string;
    email: string;
    phone: string;
  };
  visible: boolean;
  onClose: () => void;
}

const DetailModal = ({item, visible, onClose}: ContentType) => {
  return (
    <Modal
      animationType="slide"
      visible={visible}
      onRequestClose={onClose}
      transparent={false}>
      <View style={styles.centeredView}>
        <Text> Hola modal</Text>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,

    paddingHorizontal: 10,
  },
  modalView: {
    height: 300,
    width: '100%',
  },
  item: {
    paddingHorizontal: 10,
    width: '100%',
    flexDirection: 'row',
  },
  title: {
    fontWeight: 'bold',
  },
});

export default DetailModal;
